import React, { useEffect, useState } from "react";
import CardDetailProduit from "../components/CardDetailProduit";
import { useParams, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import axios from "axios";
import "../index.css";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import Nodata from "../components/Nodata";
import Card from "../components/Card";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const apiUrl = import.meta.env.VITE_API;

function DetailUser() {
  const { id } = useParams();
  const [useer, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");
  const navigate = useNavigate();
console.log({useer});

  let user = null;
  try {
    user = userData ? JSON.parse(userData) : null;
  } catch (e) {
    console.error("Erreur de parsing userData:", e);
  }
console.log({user});

  const isAuthenticated = !!token;
  const userRole = user?.role ?? null;

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const res = await axios.get(`${apiUrl}/api/users/${id}/produits`);
  //       setUtilisateur(res.data);
  //       console.log("Utilisateur récupéré :", res.data);
  //     } catch (error) {
  //       console.error("Erreur lors du chargement des produits :", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchUser();
  // }, [id]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/users/${id}`);
        setUser(res.data);
      } catch (error) {
        console.error("Erreur lors du chargement des produits :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);
  const handleDelete = async () => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;

    try {
      await axios.delete(`${apiUrl}/api/users/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Utilisateur supprimé avec succès.",  { position: "top-left" });
      navigate("/"); // ou navigate(-1) pour revenir à la page précédente
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      toast("Erreur lors de la suppression de l'utilisateur.");
    }
  };

  return (
    <Container className="pb-5 containDetailProduit">
      <ToastContainer/>
      <div className="row justify-content-between align-items-center">
      <div className="col-md-10">
      </div>
      <div className="d-flex justify-content-end p-4 responsivePadding">
              <div className="d-flex gap-3">
                {/* <Nav.Link
                  as={Link}
                  to={`/${useer?._id}/modificationProduit`}
                  className="nav-link lh-lg px-4 py-1 fw-bold navMenu navInscription"
                >
                  Modifier
                </Nav.Link> */}
                <Nav.Link
                  as={Link}
                  onClick={handleDelete}
                  to="/ajoutProduit"
                  className="nav-link lh-lg px-4 py-1 fw-bold navMenu navInscription"
                >
                  Supprimer
                </Nav.Link>
              </div>
            </div>
      </div>
      {loading ? (
        <Spinner />
      ) : !useer ? (
        <Nodata />
      ) : (
        <div className=" align-items-center">
          <div className="responsiveDetailProduit">
          <Card
                      Titre={`${useer?.firstName} ${useer?.lastName}`}
                      Description={useer?.email}
                      number={useer?.number}
                      profession={useer?.profession}
                      className={"pointerEvents"}
                    />
          </div>
        </div>
      )}
    </Container>
  );
}

export default DetailUser;
