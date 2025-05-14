import { useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DELETE_PRODUIT } from "../Routes/api/endpoints";
import useAuth from "./useAuth";

const useDeleteProduit = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const deleteProduit = useCallback(
    async (id) => {
      const confirmed = window.confirm("Voulez-vous vraiment supprimer ce produit ?");
      if (!confirmed) return;

      try {
        await axios.delete(`${DELETE_PRODUIT}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        toast.success("Produit supprimé avec succès.", { position: "top-left" });
        navigate("/");
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        toast.error("Erreur lors de la suppression du produit.", { position: "top-left" });
      }
    },
    [token, navigate]
  );

  return { deleteProduit };
};

export default useDeleteProduit;
