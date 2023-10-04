import { create } from "zustand";
import axios from "axios";
import useAdminStore from "./useAdminStore";
const useDirectorsStore = create((set, get) => ({
  directors: [],
  id_Director: "",
  searchDirector: "",
  currentDirector: null,
  messageForm: null,
  searchDirectors: (e) => set({ searchDirector: e.target.value }),
  supprimer: async (id) => {
    const { token } = useAdminStore.getState();
    if (!token) {
      set({ failMessage: "Utilisateur non authentifié ou token manquant." });
      return;
    }
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_URL}/director/sup/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ messageForm: "Supprimer avec succès" });
    } catch (error) {
      console.error("Erreur :", error);
    }
  },
  update: async (id, data, select) => {
    const { token } = useAdminStore.getState();
    if (!token) {
      set({ failMessage: "Utilisateur non authentifié ou token manquant." });
      return;
    }
    try {
      const payload = { id: id, director: data.director, image: data.image };
      if (select && select.movies.length > 0) {
        payload.movies = select.movies;
      } else {
        payload.movies = [];
      }
      console.log("payload: ", payload);
      const response = await axios.put(
        `${process.env.REACT_APP_URL}/director/update`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ messageForm: "Modifier avec succès" });
    } catch (error) {
      console.log("error: ", error);
      set({
        failMessage: error.response.data.message,
      });
    }
  },
  fetchOneDiretor: async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/director/one/${id}`
      );
      set({ currentDirector: response.data });
    } catch (error) {
      console.error("Erreur :", error);
    }
  },
  fetchDirectorsByTitle: async () => {
    const { searchDirector } = get();
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/director/search`,
        {
          params: {
            director: searchDirector,
          },
        }
      );
      set({ directors: response.data });
    } catch (error) {
      console.error("Erreur :", error);
    }
  },
  fetchAllDirectors: async () => {
    try {
      const requete = await axios.get(
        `${process.env.REACT_APP_URL}/director/all`
      );
      set({ directors: requete.data });
    } catch (error) {
      console.error("Erreur :", error);
    }
  },
  register: async (data, select) => {
    const { token } = useAdminStore.getState();
    if (!token) {
      set({ failMessage: "Utilisateur non authentifié ou token manquant." });
      return;
    }
    try {
      const payload = {
        director: data.director,
        image: data.image,
      };
      if (select && select.movies.length > 0) {
        payload.movies = select.movies;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_URL}/director/register`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ messageForm: "Enregistrer avec succès" });
    } catch (error) {
      console.log("error: ", error);
      set({
        failMessage: error.response.data.message,
      });
    }
  },
}));

export default useDirectorsStore;
