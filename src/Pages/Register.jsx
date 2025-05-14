import { ToastContainer } from "react-toastify";
import Input from "../components/Input";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Bouton from "../components/Bouton";
import { FaSpinner } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import useAuth from "../hooks/useAuth";

const Register = () => {

  const { formErrors,
    isSubmitting,
    setShowPassword,
    showPassword,
    handleChange,
    handleFormSubmit,
    formRef, formValues } = useAuth();

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
