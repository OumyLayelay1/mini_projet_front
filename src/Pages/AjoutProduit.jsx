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

const AjoutProduit = () => {
  const apiUrl = import.meta.env.VITE_API;
  const navigate = useNavigate();
  const initialValues = {
    title: "",
    image: "",
    prix: "",
    description: ""
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef();
  console.log("Image", formValues.image);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormValues({ ...formValues, image: files[0] });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormValues({ ...formValues, image: file });
  };

  const resetForm = () => {
    setFormValues(initialValues);
    formRef.current?.reset();
  };

  const validate = (values) => {
    let errors = {};

    if (!values.title || values.title.length < 2) {
        errors.title = "Mettez le titre du produit";
    }
    // if (!values.image || values.image.length < 2) {
    //     errors.image = "Mettez une image";
    //   }
      if (!values.prix || values.prix.length < 2) {
        errors.prix = "Mettez le prix";
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
        const token = localStorage.getItem("token");
  
        // Créer FormData
        const formData = new FormData();
        formData.append("title", formValues.title);
        formData.append("prix", formValues.prix);
        formData.append("description", formValues.description);
        formData.append("image", formValues.image); // IMPORTANT: formValues.image doit contenir le fichier
  
        const response = await axios.post(`${apiUrl}/api/produits/add`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
        toast.success("Produit ajouté avec succès !", { position: "top" });
        resetForm();
        navigate("/");
      } catch (error) {
        console.error(error);
        toast.error("Erreur lors de l'ajout produit.", {
          position: "top",
        });
      }
    }
  
    setIsSubmitting(false);
  };

  return (
    <section id="register">
      <div className="container py-5">
        <h1 className="text-center pb-3 pt-5">Nouveau produit</h1>
        <div className="d-flex justify-content-center">
          <div
            className="shadow rounded-3 p-4 w-100"
            style={{ maxWidth: "600px" }}
          >
            <Form ref={formRef} onSubmit={handleFormSubmit}>
              <Input
                Placeholder="Titre"
                Type="text"
                Name="title"
                Id="title"
                Htmlfor="title"
                Label="Titre"
                Value={formValues.title}
                Onchange={handleChange}
                Classname="borde"
              />
              {formErrors.title && (
                <p className="text-danger fw-bold">{formErrors.title}</p>
              )}
              <Input
                Placeholder="Prix"
                Type="number"
                Name="prix"
                Id="prix"
                Htmlfor="prix"
                Label="Prix"
                Value={formValues.prix}
                Onchange={handleChange}
                Classname="borde"
              />
              {formErrors.prix && (
                <p className="text-danger fw-bold">{formErrors.prix}</p>
              )}
               <Input
                Placeholder="Image"
                Type="file"
                Name="image"
                Id="image"
                Htmlfor="image"
                Label="Image"
                Onchange={handleFileChange}
                Classname="borde"
              />
              {formErrors.image && (
                <p className="text-danger fw-bold">{formErrors.image}</p>
              )}
               <Input
                Placeholder="Description"
                Name="description"
                Id="description"
                Htmlfor="description"
                Label="Description"
                Value={formValues.description}
                Onchange={handleChange}
                Classname="borde"
                Rows={3} As={"textarea"}
              />
              {formErrors.description && (
                <p className="text-danger fw-bold">{formErrors.description}</p>
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

export default AjoutProduit;
