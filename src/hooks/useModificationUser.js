import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { EDIT_USER, DETAIL_USER } from "../Routes/api/endpoints";
import useAuth from "./useAuth";

const useModificationUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useAuth();

  const initialValues = {
    lastName: "",
    firstName: "",
    email: "",
    number: "",
    profession: "",
    role: "",
    requesterId: id,
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${DETAIL_USER}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = response.data.data || response.data;

        setFormValues({
          lastName: user.lastName || "",
          firstName: user.firstName || "",
          email: user.email || "",
          number: user.number || "",
          profession: user.profession || "",
          role: user.role || "",
          requesterId: id || "",
        });
      } catch (error) {
        console.error("Erreur lors du chargement de l'utilisateur :", error);
        toast.error("Erreur lors du chargement de l'utilisateur.");
      }
    };

    if (id) fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("lastName", formValues.lastName);
      formData.append("firstName", formValues.firstName);
      formData.append("email", formValues.email);
      formData.append("number", formValues.number);
      formData.append("profession", formValues.profession);
      formData.append("role", formValues.role);
      formData.append("requesterId", formValues.requesterId);

      await axios.put(`${EDIT_USER}/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      toast.success("Utilisateur modifié avec succès !", { position: "top" });
      navigate(-1);
    } catch (error) {
      console.error("Erreur lors de la modification :", error);
      toast.error("Erreur lors de la modification de l'utilisateur.", {
        position: "top",
      });
    }

    setIsSubmitting(false);
  };

  return {
    formValues,
    handleFormSubmit,
    handleChange,
    isSubmitting,
    formRef,
  };
};

export default useModificationUser;
