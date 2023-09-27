import { create } from "zustand";
import axios from "axios";
const useDirectorsStore = create((set, get) => ({
  directors: [],
  id_Director: "",
  searchDirector: "",
  currentDirector: null,
  searchDirectors: (e) => set({ searchDirector: e.target.value }),
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
}));

export default useDirectorsStore;
