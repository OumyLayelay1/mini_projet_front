import "../index.css";
import slide1 from "../assets/Images/shop.jpeg";
import slide2 from "../assets/Images/shop1.jpeg";
import slide3 from "../assets/Images/shop2.jpeg";
import CarouselComponent from "../components/CarouselComponent";
import Card from "../components/Card";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { Nodata } from "../components/Nodata";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../hooks/useAuth";
import useFetchProduit from "../hooks/useFetchProduit";
import useFetchUser from "../hooks/useFetchUser";

export const slides = [
  { id: "1", image: slide2 },
  { id: "2", image: slide3 },
  { id: "3", image: slide1 },
];

const Accueil = () => {
  
  const { isAuthenticated, userRole } = useAuth();
  const { isLoading, produits } = useFetchProduit();
  const { isLoadingUser, users } = useFetchUser();

  return (
      <div className="">
        <div className="">
          <CarouselComponent data={slides} />
        </div>
        <div className="container pt-4" id="produits">
          {isAuthenticated && userRole === "user" && (
            <div className="d-flex justify-content-end p-4">
              <Nav.Link
                as={Link}
                to="/ajoutProduit"
                className="nav-link lh-lg px-4 py-1 fw-bold navMenu navInscription"
              >
                Ajouter un produit
              </Nav.Link>
            </div>
          )}
          <h1 className="fs-2 fw-bold text-center title">Nos produits</h1>
          <div className="row mb-5 pt-5">
            {(() => {
              const userData = localStorage.getItem("user");
              const user = userData ? JSON.parse(userData) : null;
              const produitsFiltres = Array.isArray(produits)
              ? produits.filter((produit) => {
                  if (!user) return true;
                  if (user.role === "admin") return true;
                  if (user.role === "user") {
                    return produit.user === user.id;
                  }
                  return false;
                })
              : [];

              return isLoading ? (
                <Spinner />
              ) : produitsFiltres.length === 0 ? (
                <Nodata/>
              ) : (
                produitsFiltres.map((produit) => (
                  <Card
                    key={produit?._id}
                    Image={produit?.image}
                    alt="Une image"
                    Titre={produit?.title}
                    Prix={`${produit?.prix} FCFA`}
                    Description={produit?.description}
                    lien={`/${produit?._id}/detailProduit`}
                  />
                ))
              );
            })()}
          </div>
        </div>
        <div id="utilisateurs">
          {isAuthenticated && userRole === "admin" && (
            <div className="container pt-4">
              <h1 className="fs-2 fw-bold text-center title">
                Nos utilisateurs
              </h1>
              <div className="row mb-5 pt-5">
                {isLoadingUser ? (
                  <Spinner />
                ) : users.length === 0 ? (
                  <Nodata/>
                ) : (
                  users.map((user) => (
                    <Card
                      key={user?.id}
                      Titre={`${user?.firstName} ${user?.lastName}`}
                      Description={user?.email}
                      number={user?.number}
                      profession={user?.profession}
                      lien={`/${user?._id}/detailUser`}
                    />
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      <ToastContainer />
      </div>
  );
};

export default Accueil;
