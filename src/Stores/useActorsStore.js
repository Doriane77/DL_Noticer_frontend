import { create } from "zustand";
import axios from "axios";
import useAdminStore from "./useAdminStore";
const useActorsStore = create((set, get) => ({
  actors: [],
  searchActor: "",
  currentActor: null,
  messageForm: null,
  searchActors: (e) => set({ searchActor: e.target.value }),
  supprimer: async (id) => {
    const { token } = useAdminStore.getState();
    if (!token) {
      set({ failMessage: "Utilisateur non authentifié ou token manquant." });
      return;
    }
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_URL}/actor/sup/${id}`,
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
      const payload = {
        id: id,
        name: data.name,
        surname: data.surname,
        image: data.image,
      };
      if (select && select.select.length > 0) {
        payload.movies = select.select;
      } else {
        payload.movies = [];
      }
      console.log("payload: ", payload);
      const response = await axios.put(
        `${process.env.REACT_APP_URL}/actor/update`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response: ", response);
      set({ messageForm: "Enregistrer avec succès" });
    } catch (error) {
      console.log("error: ", error);
      set({
        failMessage: error.response.data.message,
      });
    }
  },
  fetchOneActor: async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/actor/one/${id}`
      );
      set({ currentActor: response.data });
    } catch (error) {
      console.error("Erreur :", error);
    }
  },
  fetchActorsByTitle: async () => {
    const { searchActor } = get();
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/actor/search`,
        {
          params: {
            name: searchActor,
          },
        }
      );
      set({ actors: response.data });
    } catch (error) {
      console.error("Erreur :", error);
    }
  },
  fetchAllActors: async () => {
    try {
      const requete = await axios.get(`${process.env.REACT_APP_URL}/actor/all`);
      set({ actors: requete.data });
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
        name: data.name,
        surname: data.surname,
        image: data.image,
      };
      if (select && select.length > 0) {
        payload.movies = select;
      }
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/actor/register`,
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

export default useActorsStore;
