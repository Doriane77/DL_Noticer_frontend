import { create } from "zustand";
import axios from "axios";
const useActorsStore = create((set, get) => ({
  actors: [],
  searchActor: "",
  searchActors: (e) => set({ searchActor: e.target.value }),
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
}));

export default useActorsStore;
