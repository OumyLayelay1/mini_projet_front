import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { REGISTER, LOGIN } from "../Routes/api/endpoints";

export default function useAuth() {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");

  const user = useMemo(() => {
    try {
      return userData ? JSON.parse(userData) : null;
    } catch (e) {
      console.error("Erreur de parsing userData:", e);
      return null;
    }
  }, [userData]);

  const isAuthenticated = !!token;
  const userRole = user?.role ?? null;

  const navigate = useNavigate();
  const initialValues = {
    lastName: "",
    firstName: "",
    email: "",
    number: "",
    profession: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const resetForm = () => {
    setFormValues(initialValues);
    formRef.current?.reset();
  };

  const validate = (values) => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const phoneRegex = /^\+?\d{9,15}$/;

    if (!values.lastName || values.lastName.length < 2) {
      errors.lastName = "Mettez votre nom.";
    }
    if (!values.firstName || values.firstName.length < 2) {
      errors.firstName = "Mettez votre prénom.";
    }
    if (!values.email || !emailRegex.test(values.email)) {
      errors.email = "Le format de l'email est invalide.";
    }
    if (!values.number || !phoneRegex.test(values.number)) {
      errors.number = "Numéro de téléphone incorrect.";
    }
    if (!values.password || values.password.length < 8) {
      errors.password = "Mot de passe trop court (min. 8 caractères).";
    }
    if (!values.profession || values.profession.length < 2) {
      errors.profession = "Indiquez votre profession.";
    }

    return errors;
  };
  const validateLogin = (values) => {
  let errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  if (!values.email || !emailRegex.test(values.email)) {
    errors.email = "Le format de l'email est invalide.";
  }
  if (!values.password || values.password.length < 8) {
    errors.password = "Mot de passe trop court (min. 8 caractères).";
  }

  return errors;
};

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(`${REGISTER}`, formValues);
        toast.success("Inscription réussie !", { position: "bottom-left" });
        resetForm();
        navigate("/login");
      } catch (error) {
        console.error(error);
        toast.error("Erreur lors de l'inscription.", {
          position: "bottom-left",
        });
      }
    }

    setIsSubmitting(false);
  };

    const handleFormSubmitLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const errors = validateLogin(formValues);
    setFormErrors(errors);
  
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(`${LOGIN}`, formValues);
  
        const token = response.data?.token;
        const user = response.data?.user;
        
        if (token && user) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user)); 
          toast.success("Connexion réussie !", { position: "top-left" });
          resetForm();
          navigate("/");
        } else {
          toast.error("Token ou utilisateur manquant.", { position: "top-left" });
        }
      } catch (error) {
        console.error(error);
        toast.error("Erreur lors de la connexion.", {
          position: "top-left",
        });
      }
    }
  
    setIsSubmitting(false);
  };

  return {
    token,
    user,
    isAuthenticated,
    userRole,
    formErrors,
    isSubmitting,
    setShowPassword,
    showPassword,
    handleChange,
    handleFormSubmit, handleFormSubmitLogin,
    formRef, formValues
  };
}
