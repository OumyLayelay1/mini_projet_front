import { DELETE_USER } from "../Routes/api/endpoints";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "./useAuth";

const useDeleteUser = () => {

const navigate = useNavigate();
const { id } = useParams();
const { token } = useAuth

     const handleDelete = async () => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;

    try {
      await axios.delete(`${DELETE_USER}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Utilisateur supprimé avec succès.",  { position: "top-left" });
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      toast("Erreur lors de la suppression de l'utilisateur.");
    }
    [navigate, token]
  };

  return { handleDelete }
}

export default useDeleteUser
