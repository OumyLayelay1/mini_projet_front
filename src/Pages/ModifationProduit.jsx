import React, { useEffect, useRef, useState } from "react";
import Input from "../components/Input";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Bouton from "../components/Bouton";
import { toast, ToastContainer } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

const ModifationProduit = () => {
  const apiUrl = import.meta.env.VITE_API;
  const imageBaseUrl = import.meta.env.VITE_URL_IMAGE;
  const navigate = useNavigate();
  const { id } = useParams();

  const initialValues = {
    title: "",
    image: null,
    prix: "",
    description: "",
    imageUrl: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${apiUrl}/api/produits/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Réponse complète de l'API :", response);
        console.log("Contenu de response.data :", response.data);

        // Adapter ici si la réponse est imbriquée dans data.data
        const produit = response.data.data || response.data;

        console.log("Produit extrait :", produit);

        setFormValues({
          title: produit.title || "",
          prix: produit.prix || "",
          description: produit.description || "",
          image: null,
          imageUrl: produit.image_url
    ? produit.image_url
    : produit.image
    ? `${imageBaseUrl}/${produit.image}`
    : "",
        });
      } catch (error) {
        console.error("Erreur lors du chargement du produit :", error);
        console.error("Détail erreur :", error.response?.data || error.message);
        toast.error("Erreur lors du chargement du produit.");
      }
    };

    fetchProduct();
  }, [id, apiUrl]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormValues({ ...formValues, image: files[0] });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const validate = (values) => {
    let errors = {};
    if (!values.title || values.title.length < 2) {
      errors.title = "Mettez le titre du produit";
    }
    if (!values.prix || values.prix.length < 1) {
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

        const formData = new FormData();
        formData.append("title", formValues.title);
        formData.append("prix", formValues.prix);
        formData.append("description", formValues.description);
        if (formValues.image) {
          formData.append("image", formValues.image);
        }

        const response = await axios.put(`${apiUrl}/api/produits/edit/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Réponse de mise à jour :", response);

        toast.success("Produit modifié avec succès !", { position: "top" });
        navigate(-1);
      } catch (error) {
        console.error("Erreur lors de la modification :", error);
        console.error("Détail :", error.response?.data || error.message);
        toast.error("Erreur lors de la modification du produit.", {
          position: "top",
        });
      }
    }

    setIsSubmitting(false);
  };

  return (
    <section id="register">
      <div className="container py-5">
        <h1 className="text-center pb-3 pt-5">Modification d'un produit</h1>
        <div className="d-flex justify-content-center">
          <div
            className="shadow rounded-3 p-4 w-100"
            style={{ maxWidth: "600px" }}
          >
            <Form ref={formRef} onSubmit={handleFormSubmit}>
              <Input
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

              {/* Affichage image actuelle */}
              {/* {formValues.imageUrl && (
                <div className="mb-3">
                  <label>Image actuelle :</label>
                  <img
                    src={`${imageBaseUrl}/uploads/${formValues?.image}`}
                    alt="Aperçu du produit"
                    style={{ maxWidth: "100%", height: "auto" }}
                    className="mb-2"
                  />
                </div>
              )} */}

              <Input
                Placeholder="Image"
                Type="file"
                Name="image"
                Id="image"
                Htmlfor="image"
                Label="Nouvelle image (optionnel)"
                Onchange={handleChange}
                Classname="borde"
              />

              <Input
                Placeholder="Description"
                Name="description"
                Id="description"
                Htmlfor="description"
                Label="Description"
                Value={formValues.description}
                Onchange={handleChange}
                Classname="borde"
                Rows={3}
                As="textarea"
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
                      "Modifier"
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

export default ModifationProduit;
