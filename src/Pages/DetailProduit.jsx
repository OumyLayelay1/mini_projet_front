import CardDetailProduit from "../components/CardDetailProduit";
import Container from "react-bootstrap/Container";
import "../index.css";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import Nodata from "../components/Nodata";
import { ToastContainer } from "react-toastify";
import useAuth from "../hooks/useAuth";
import useDetailProduit from "../hooks/useDetailProduit";
import useDeleteProduit from "../hooks/useDeleteProduit";

function DetailProduit() {
  
  const {  userRole, isAuthenticated } = useAuth();
  const { produit, loading } = useDetailProduit();
  const { deleteProduit } = useDeleteProduit()  

  return (
    <Container className="pb-5 containDetailProduit">
      <ToastContainer/>
      <div className="row justify-content-between align-items-center">
      <div className="col-md-10">
      {/* {(userRole === "admin") && (
  <Card
    key={user?.id}
    Titre={`${user?.firstName} ${user?.lastName}`}
    Description={`Email: ${user?.email}`}
    number={`Téléphone: +221${user?.number}`}
    className={"pointerEvents"}
  />
)} */}
      </div>
        <div className="col-md-2">
          {isAuthenticated && userRole === "user" && (
            <div className="d-flex justify-content-end p-4 responsivePadding">
              <div className="d-flex gap-3">
                <Nav.Link
                  as={Link}
                  to={`/${produit?._id}/modificationProduit`}
                  className="nav-link lh-lg px-4 py-1 fw-bold navMenu navInscription"
                >
                  Modifier
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  onClick={() => deleteProduit(produit._id)}
                  to="/ajoutProduit"
                  className="nav-link lh-lg px-4 py-1 fw-bold navMenu navInscription"
                >
                  Supprimer
                </Nav.Link>
              </div>
            </div>
          )}
          {isAuthenticated && userRole === "admin" && (
            <div className="d-flex justify-content-end p-4 responsivePadding">
              <div className="d-flex gap-3">
                <Nav.Link
                  as={Link}
                  onClick={() => deleteProduit(produit._id)}
                  to="/ajoutProduit"
                  className="nav-link lh-lg px-4 py-1 fw-bold navMenu navInscription"
                >
                  Supprimer
                </Nav.Link>
              </div>
            </div>
          )}
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : !produit ? (
        <Nodata />
      ) : (
        <div className="row align-items-center">
          <div className="col-md-6 responsiveDetailProduit">
            <CardDetailProduit
              Titre={produit?.title}
              Description={produit?.description}
              Prix={produit?.prix}
            />
          </div>
          <div className="col-md-6 responsiveDetailProduit">
            <img
              src={produit?.image}
              alt="Image du produit"
              className="containImageDetailProduit"
            />
          </div>
        </div>
      )}
    </Container>
  );
}

export default DetailProduit;
