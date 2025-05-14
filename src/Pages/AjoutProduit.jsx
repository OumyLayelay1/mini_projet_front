import Input from "../components/Input";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Bouton from "../components/Bouton";
import { FaSpinner } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import useAjoutProduit from "../hooks/useAjoutProduit";
const AjoutProduit = () => {
  const {
    formValues,
    formErrors,
    isSubmitting,
    handleChange,
    handleFileChange,
    handleFormSubmit,
    formRef,
  } = useAjoutProduit();
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
                Rows={3}
                As={"textarea"}
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
