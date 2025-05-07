import React, { useRef, useState } from "react";
import Input from "../components/Input";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Bouton from "../components/Bouton";
import { toast, ToastContainer } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";


const Login = () => {
  const apiUrl = import.meta.env.VITE_API;
  const navigate = useNavigate();
  const initialValues = {
    email: "",
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
        const response = await axios.post(`${apiUrl}/api/auth/login`, formValues);
  
        const token = response.data?.token;
        const user = response.data?.user;
        
        if (token && user) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user)); 
          toast.success("Connexion réussie !", { position: "top-left" });
          resetForm();
          navigate("/");
          window.location.reload();
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
  

  return (
    <section id="register">
      <div className="container py-5">
        <h1 className="text-center pb-3 pt-5">Connexion</h1>
        <div className="d-flex justify-content-center">
          <div
            className="shadow rounded-3 p-4 w-100"
            style={{ maxWidth: "600px" }}
          >
            <Form ref={formRef} onSubmit={handleFormSubmit}>
              <Input
                Placeholder="Email"
                Type="email"
                Name="email"
                Id="email"
                Htmlfor="email"
                Label="Email"
                Value={formValues.email}
                Onchange={handleChange}
                Classname="borde"
              />
              {formErrors.email && (
                <p className="text-danger fw-bold">{formErrors.email}</p>
              )}
              <div className="position-relative">
              <Input
                Placeholder="*********"
                Type={showPassword ? "text" : "password"}
                Name="password"
                Id="password"
                Htmlfor="password"
                Label="Mot de passe"
                Value={formValues.password}
                Onchange={handleChange}
                Classname="borde w-100"
              />
             <div className="d-flex justify-content-end p-2">
             <span
                            className="position-absolute eyes"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                              cursor: "pointer",
                            }}
                          >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                          </span>
             </div>
              </div>

              {formErrors.password && (
                <p className="text-danger fw-bold">{formErrors.password}</p>
              )}
              <Row>
                <Bouton
                  Name={
                    isSubmitting ? (
                      <FaSpinner className="fs-3 rotate-animation" />
                    ) : (
                      "Envoyer"
                    )
                  }
                  BgColor="#FFC20F"
                  Color="#010101"
                  Border="#FFC20F"
                  FontSize="16px"
                  Width="100%"
                  Padding="12px"
                  Disabled={isSubmitting}
                />
              </Row>
              <ToastContainer />
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
