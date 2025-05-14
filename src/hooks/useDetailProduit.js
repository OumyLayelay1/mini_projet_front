import {useState, useEffect} from 'react'
import { PRODUITS } from '../Routes/api/endpoints';
import axios from "axios";
import { useParams } from "react-router-dom";

const useDetailProduit = () => {

    const [produit, setProduit] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

    useEffect(() => {
        const fetchProduit = async () => {
          try {
            const res = await axios.get(`${PRODUITS}/${id}`);
            setProduit(res.data);
          } catch (error) {
            console.error("Erreur lors du chargement des produits :", error);
          } finally {
            setLoading(false);
          }
        };
        fetchProduit();
      }, [id]);

  return {
    produit, loading
  }
}

export default useDetailProduit
