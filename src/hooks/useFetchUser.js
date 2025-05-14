import {useState, useEffect} from 'react'
import { USERS } from '../Routes/api/endpoints';
import axios from 'axios'

const useFetchUser = () => {

    const [users, setUsers] = useState([]);
    const [isLoadingUser, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await axios.get(USERS);
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

  return {
    users, isLoadingUser
  }
}

export default useFetchUser
