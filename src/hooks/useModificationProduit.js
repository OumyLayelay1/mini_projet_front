import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { PRODUITS } from "../Routes/api/endpoints"
import useAuth from "./useAuth";

const useModificationProduit = () => {
     const apiUrl = import.meta.env.VITE_API;
  const imageBaseUrl = import.meta.env.VITE_URL_IMAGE;
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useAuth

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

        const response = await axios.get(`${PRODUITS}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const produit = response.data.data || response.data;

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

        const formData = new FormData();
        formData.append("title", formValues.title);
        formData.append("prix", formValues.prix);
        formData.append("description", formValues.description);
        if (formValues.image) {
          formData.append("image", formValues.image);
        }

        const response = await axios.put(`${PRODUITS}/edit/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

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
    [ navigate, token ]
  };

  return { formErrors, formValues, handleFormSubmit, handleChange, isSubmitting, formRef }
}

export default useModificationProduit
