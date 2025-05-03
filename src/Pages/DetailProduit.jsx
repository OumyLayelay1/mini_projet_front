import React, { useEffect, useState } from 'react';
import CardDetailProduit from '../components/CardDetailProduit';
import { useParams, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import axios from 'axios';
import "../index.css";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API;
const imageUrl = import.meta.env.VITE_URL_IMAGE;

function DetailProduit() {
  const { id } = useParams();
  const [produit, setProduit] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");
  const navigate = useNavigate();

  let user = null;
  try {
    user = userData ? JSON.parse(userData) : null;
  } catch (e) {
    console.error("Erreur de parsing userData:", e);
  }

  const isAuthenticated = !!token;
  const userRole = user?.role ?? null;

  useEffect(() => {
    axios.get(`${apiUrl}/api/produits/${id}`)
      .then((res) => {
        setProduit(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération du produit :", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (!produit) return <p>Produit introuvable</p>;

  const handleDelete = async () => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce produit ?")) return;
  
    try {
      await axios.delete(`${apiUrl}/api/produits/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Produit supprimé avec succès.");
      navigate("/"); // ou navigate(-1) pour revenir à la page précédente
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Erreur lors de la suppression du produit.");
    }
  };

  return (
    <Container className='pb-5 containDetailProduit'>
      <div>
      {isAuthenticated && userRole === "user" && (
            <div className="d-flex justify-content-end p-4">
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
                onClick={handleDelete}
                to="/ajoutProduit"
                className="nav-link lh-lg px-4 py-1 fw-bold navMenu navInscription"
              >
                Supprimer
              </Nav.Link>
              </div>
            </div>
          )}
      </div>
      <div className="row align-items-center">
        <div className='col-md-6'>
          <CardDetailProduit
            Titre={produit?.title}
            Description={produit?.description}
            Prix={produit?.prix}
          />
        </div>
        <div className='col-md-6'>
          <img src={`${imageUrl}/uploads/${produit?.image}`} alt="Image du produit" className='containImageDetailProduit' />
        </div>
      </div>
    </Container>
  );
}

export default DetailProduit;
