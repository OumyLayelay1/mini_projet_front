import React, { useRef, useState } from "react";
import Input from "../components/Input";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Bouton from "../components/Bouton";
import { toast, ToastContainer } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const apiUrl = import.meta.env.VITE_API;
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(`${apiUrl}/api/auth/register`, formValues);
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

  return (
    <section id="register">
      <div className="container py-5">
        <h1 className="text-center pb-3 pt-5">Inscription</h1>
        <div className="d-flex justify-content-center">
          <div
            className="shadow rounded-3 p-4 w-100"
            style={{ maxWidth: "600px" }}
          >
            <Form ref={formRef} onSubmit={handleFormSubmit}>
              <Row>
                <Col md={6}>
                  <Input
                    Placeholder="Prénom"
                    Type="text"
                    Name="firstName"
                    Id="Prenom"
                    Htmlfor="Prenom"
                    Label="Prénom"
                    Values={formValues.firstName}
                    Onchange={handleChange}
                    Classname="borde"
                  />
                  {formErrors.firstName && (
                    <p className="text-danger fw-bold">
                      {formErrors.firstName}
                    </p>
                  )}
                </Col>
                <Col md={6}>
                  <Input
                    Placeholder="Nom"
                    Type="text"
                    Name="lastName"
                    Id="Nom"
                    Htmlfor="Nom"
                    Label="Nom"
                    Values={formValues.lastName}
                    Onchange={handleChange}
                    Classname="borde"
                  />
                  {formErrors.lastName && (
                    <p className="text-danger fw-bold">{formErrors.lastName}</p>
                  )}
                </Col>
              </Row>
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
              <Input
                Placeholder="+221 77 000 00 00"
                Type="text"
                Name="number"
                Id="number"
                Htmlfor="number"
                Label="Numéro de téléphone"
                Value={formValues.number}
                Onchange={handleChange}
                Classname="borde"
              />
              {formErrors.number && (
                <p className="text-danger fw-bold">{formErrors.number}</p>
              )}
              <Input
                Placeholder="*********"
                Type="password"
                Name="password"
                Id="password"
                Htmlfor="password"
                Label="Mot de passe"
                Value={formValues.password}
                Onchange={handleChange}
                Classname="borde"
              />
              {formErrors.password && (
                <p className="text-danger fw-bold">{formErrors.password}</p>
              )}
              <Input
                Placeholder="Profession"
                Type="text"
                Name="profession"
                Id="profession"
                Htmlfor="profession"
                Label="Profession"
                Values={formValues.profession}
                Onchange={handleChange}
                Classname="borde"
              />
              {formErrors.profession && (
                <p className="text-danger fw-bold">{formErrors.profession}</p>
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

export default Register;
