import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DETAIL_USER } from "../Routes/api/endpoints";

const useDetailUser = () => {
      const { id } = useParams();
  const [user, setUser] = useState(null);
  const [userProduit, setUserProduit] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingProduit, setLoadingProduit] = useState(true);

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
        const res = await axios.get(`${DETAIL_USER}/${id}`);
        setUser(res.data);
      } catch (error) {
        console.error("Erreur lors du chargement des produits :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${DETAIL_USER}/${id}/produits`);
        if (Array.isArray(res.data?.user?.produits)) {
              setUserProduit(res.data?.user?.produits);
            } else {
              console.warn("Réponse inattendue de l'API :", res.data?.user?.produits);
              setUserProduit([]);
            }
      } catch (error) {
        console.error("Erreur lors du chargement des produits :", error);
      } finally {
        setLoadingProduit(false);
      }
    };
    fetchUser();
  }, [id]);

  return { user, loading, userProduit, loadingProduit }
}

export default useDetailUser
