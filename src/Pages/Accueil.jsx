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

export const slides = [
  { id: "1", image: slide2 },
  { id: "2", image: slide3 },
  { id: "3", image: slide1 },
];

const apiUrl = import.meta.env.VITE_API;
const imageUrl = import.meta.env.VITE_URL_IMAGE;

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
  useEffect(() => {
    axios
      .get(`${apiUrl}/api/produits`)
      .then((res) => {
        setProduits(res.data);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des produits :", err);
      });
  }, []);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/users`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des produits :", err);
      });
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

              // Filtrage des produits selon le rôle
              const produitsFiltres = produits.filter((produit) => {
                if (!user) return true; // non connecté = voir tous les produits
                if (user.role === "admin") return true; // admin = voir tous les produits
                if (user.role === "user") {
                  const match = produit.user === user.id;
                  return match; // user = voir ses produits uniquement
                }
                return false;
              });

              if (produitsFiltres.length === 0) {
                return (
                  <p className="text-center fs-5 text-muted">
                    Aucun produit disponible.
                  </p>
                );
              }

              return produitsFiltres.map((produit) => (
                <Card
                  key={produit?.id}
                  Image={`${imageUrl}/uploads/${produit?.image}`}
                  alt="Une image"
                  Titre={produit?.title}
                  Prix={`${produit?.prix} FCFA`}
                  Description={produit?.description}
                  lien={`/${produit?._id}/detailProduit`}
                />
              ));
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
                {users.map((user) => (
                  <Card
                    key={user?.id}
                    Titre={`${user?.firstName} ${user?.lastName}`}
                    Description={user?.email}
                    number={user?.number}
                    profession={user?.profession}
                    className={"pointerEvents"}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Accueil;
