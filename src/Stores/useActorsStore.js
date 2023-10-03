import { create } from "zustand";
import axios from "axios";
import useAdminStore from "./useAdminStore";
const useActorsStore = create((set, get) => ({
  actors: [],
  searchActor: "",
  currentActor: null,
  searchActors: (e) => set({ searchActor: e.target.value }),
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
      console.log("response: ", response);
    } catch (error) {
      console.log("error: ", error);
      set({
        failMessage: error.response.data.message,
      });
    }
  },
}));

export default useActorsStore;
