import { ToastContainer } from "react-toastify";
import Container from "react-bootstrap/Container";
import "../index.css";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import Nodata from "../components/Nodata";
import Card from "../components/Card";
import "react-toastify/dist/ReactToastify.css";
import useDetailUser from "../hooks/useDetailUser";
import useDeleteUser from "../hooks/useDeleteUser";
import { IoArrowBackCircleSharp } from "react-icons/io5";

function DetailUser() {
  const { user, loading, userProduit, loadingProduit } = useDetailUser();
  const { handleDelete } = useDeleteUser();

  return (
    <Container className="pb-5 containDetailProduit">
      <ToastContainer />
      <Link to={-1} className="fw-bold fs-1 text-dark"><IoArrowBackCircleSharp/></Link>
      <div className="row justify-content-between align-items-baseline p-4">
        <div className="col-md-2">
          <div className="responsivePadding">
            <div className="d-flex gap-3">
              <Nav.Link
                as={Link}
                to={`/${user?._id}/modificationUser`}
                className="nav-link lh-lg px-4 py-1 fw-bold navMenu navInscription"
              >
                Modifier
              </Nav.Link>
              <Nav.Link
                as={Link}
                onClick={() => handleDelete(user?._id)}
                to="/ajoutProduit"
                className="nav-link lh-lg px-4 py-1 fw-bold navMenu navInscription"
              >
                Supprimer
              </Nav.Link>
            </div>
          </div>
        </div>
        <div className="col-md-10 d-flex justify-content-end responsiveDetailProduit">
          {loading ? (
            <Spinner />
          ) : !user ? (
            <Nodata />
          ) : (
            <Card
              Titre={`${user?.firstName} ${user?.lastName}`}
              Description={user?.email}
              number={user?.number}
              profession={user?.profession}
              className={"pointerEvents"}
            />
          )}
        </div>
      </div>
      <div className="row">
       {loadingProduit ? (
  <Spinner />
) : !userProduit || userProduit.length === 0 ? (
  <div className="text-center fs-4 w-100 bg-warning no-data">Cet utilisateur n’a publié aucun produit</div>
) : (
  userProduit.map((item) => (
    <Card
      key={item?._id}
      Image={item?.image}
      alt="Une image"
      Titre={item?.title}
      Prix={`${item?.prix} FCFA`}
      Description={item?.description}
      lien={`/${item?._id}/detailProduit`}
    />
  ))
)}
      </div>
    </Container>
  );
}

export default DetailUser;
