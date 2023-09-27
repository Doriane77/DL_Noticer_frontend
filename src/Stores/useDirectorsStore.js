import { create } from "zustand";
import axios from "axios";
const useDirectorsStore = create((set, get) => ({
  directors: [],
  searchDirector: "",
  searchDirectors: (e) => set({ searchDirector: e.target.value }),
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
