import Input from "../components/Input";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Bouton from "../components/Bouton";
import "react-toastify/dist/ReactToastify.css";
import { FaSpinner } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import useModificationUser from "../hooks/useModificationUser";

const ModifationUser = () => {
  const {
    formValues,
    handleFormSubmit,
    handleChange,
    isSubmitting,
    formRef,
  } = useModificationUser();

  return (
    <section id="register">
      <div className="container py-5">
        <h1 className="text-center pb-3 pt-5">Modification d'un utilisateur</h1>
        <div className="d-flex justify-content-center">
          <div
            className="shadow rounded-3 p-4 w-100"
            style={{ maxWidth: "600px" }}
          >
            <Form ref={formRef} onSubmit={handleFormSubmit}>
               <Input
                Type="text"
                Name="firstName"
                Id="firstName"
                Htmlfor="firstName"
                Label="Prénom"
                Value={formValues.firstName}
                Onchange={handleChange}
                Classname="borde"
              />
               <Input
                Type="text"
                Name="lastName"
                Id="lastName"
                Htmlfor="lastName"
                Label="Nom"
                Value={formValues.lastName}
                Onchange={handleChange}
                Classname="borde"
              />
              <Input
                Type="email"
                Name="email"
                Id="email"
                Htmlfor="email"
                Value={formValues.email}
                Label="Email"
                Onchange={handleChange}
                Classname="borde"
              />
              <Input
                Name="number"
                Id="number"
                Htmlfor="number"
                Label="Téléphone"
                Value={formValues.number}
                Onchange={handleChange}
                Classname="borde"
                Type={"number"}
              />
              <Input
                Name="profession"
                Id="profession"
                Htmlfor="profession"
                Label="Profession"
                Value={formValues.profession}
                Onchange={handleChange}
                Classname="borde"
                Type={"text"}
              />
              <Input
                Name="role"
                Id="role"
                Htmlfor="role"
                Label="Rôle"
                Value={formValues.role}
                Onchange={handleChange}
                Classname="borde"
                Type={"text"}
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

export default ModifationUser;
