import { create } from "zustand";
import axios from "axios";
const useAuthorsStore = create((set, get) => ({
  authors: [],
  searchAuthor: "",
  searchAuthors: (e) => set({ searchAuthor: e.target.value }),
  fetchAuthorsByTitle: async () => {
    const { searchAuthor } = get();
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/author/search`,
        {
          params: {
            director: searchAuthor,
          },
        }
      );
      set({ authors: response.data });
    } catch (error) {
      console.error("Erreur :", error);
    }
  },
  fetchAllAuthors: async () => {
    try {
      const requete = await axios.get(
        `${process.env.REACT_APP_URL}/author/all`
      );
      set({ authors: requete.data });
    } catch (error) {
      console.error("Erreur :", error);
    }
  },
}));

export default useAuthorsStore;
