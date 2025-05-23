import Input from "../components/Input";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Bouton from "../components/Bouton";
import "react-toastify/dist/ReactToastify.css";
import { FaSpinner } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import useModificationProduit from "../hooks/useModificationProduit";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const ModifationProduit = () => {
  const { formValues, handleFormSubmit, handleChange, isSubmitting, formRef } =
    useModificationProduit();

  return (
    <section id="register">
      <div className="container py-5">
        <div className="pt-5">
          <Link to={-1} className="fw-bold fs-1 text-dark">
            <IoArrowBackCircleSharp />
          </Link>
        </div>
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
              <Input
                Type="number"
                Name="prix"
                Id="prix"
                Htmlfor="prix"
                Label="Prix"
                Value={formValues.prix}
                Onchange={handleChange}
                Classname="borde"
              />
              <Input
                Placeholder="Image"
                Type="file"
                Name="image"
                Id="image"
                Htmlfor="image"
                Label="Nouvelle image"
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
