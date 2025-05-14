import { useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PRODUITS } from "../Routes/api/endpoints";
import useAuth from "./useAuth";

const useAjoutProduit = () => {
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
    const { token } = useAuth();
    
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
    
          const formData = new FormData();
          formData.append("title", formValues.title);
          formData.append("prix", formValues.prix);
          formData.append("description", formValues.description);
          formData.append("image", formValues.image);
    
          const response = await axios.post(`${PRODUITS}/add`, formData, {
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
      [ navigate ]
    };

    return { formValues, formErrors, isSubmitting, handleChange, handleFileChange, handleFormSubmit, formRef }
}

export default useAjoutProduit
