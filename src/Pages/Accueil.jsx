import React, { useEffect, useState } from "react";
import axios from "axios";
import "../index.css";
import slide1 from "../assets/Images/shop.jpeg";
import slide2 from "../assets/Images/shop1.jpeg";
import slide3 from "../assets/Images/shop2.jpeg";
import CarouselComponent from "../components/CarouselComponent";
import Card from "../components/Card";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import Nodata from "../components/Nodata";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const slides = [
  { id: "1", image: slide2 },
  { id: "2", image: slide3 },
  { id: "3", image: slide1 },
];

const apiUrl = import.meta.env.VITE_API;

const Accueil = () => {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");

  let user = null;
  try {
    user = userData ? JSON.parse(userData) : null;
  } catch (e) {
    console.error("Erreur de parsing userData:", e);
  }

  const isAuthenticated = !!token;
  const userRole = user?.role ?? null;
  const [produits, setProduits] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/produits`);
        if (Array.isArray(response.data)) {
          setProduits(response.data);
        } else {
          console.warn("Réponse inattendue de l'API :", response.data);
          setProduits([]);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
        setProduits([]);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchProduits();
  }, []);  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/users`);
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.warn("Réponse inattendue de l'API :", response.data);
          setUsers([]);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="">
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
                {isLoading ? (
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
      </div>
      <ToastContainer />
    </div>
  );
};

export default Accueil;
