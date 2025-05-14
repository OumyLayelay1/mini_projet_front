import {useState, useEffect} from 'react'
import { PRODUITS } from '../Routes/api/endpoints';
import axios from "axios";

const useFetchProduit = () => {
      const [produits, setProduits] = useState([]);
       const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProduits = async () => {
          try {
            const response = await axios.get(PRODUITS);
            if (Array.isArray(response.data)) {
              setProduits(response.data);
            } else {
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

  return {
    produits, isLoading
  }
}

export default useFetchProduit
