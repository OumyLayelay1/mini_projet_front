import Input from "../components/Input";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Bouton from "../components/Bouton";
import { ToastContainer } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import useAuth from "../hooks/useAuth";


const Login = () => {

   const { formErrors,
      isSubmitting,
      setShowPassword,
      showPassword,
      handleChange,
      handleFormSubmitLogin,
      formRef, formValues } = useAuth();

  return (
    <section id="register">
      <div className="container py-5">
        <h1 className="text-center pb-3 pt-5">Connexion</h1>
        <div className="d-flex justify-content-center">
          <div
            className="shadow rounded-3 p-4 w-100"
            style={{ maxWidth: "600px" }}
          >
            <Form ref={formRef} onSubmit={handleFormSubmitLogin}>
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
