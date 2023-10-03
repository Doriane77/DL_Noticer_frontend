import { create } from "zustand";
import axios from "axios";
import useAdminStore from "./useAdminStore";
const useAuthorsStore = create((set, get) => ({
  authors: [],
  searchAuthor: "",
  currentAuthor: null,
  searchAuthors: (e) => set({ searchAuthor: e.target.value }),
  fetchOneAuthor: async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/author/one/${id}`
      );
      set({ currentAuthor: response.data });
    } catch (error) {
      console.error("Erreur :", error);
    }
  },
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
  register: async (data, select) => {
    const { token } = useAdminStore.getState();
    if (!token) {
      set({ failMessage: "Utilisateur non authentifié ou token manquant." });
      return;
    }
    try {
      const payload = { author: data.author, image: data.image };
      if (select && select.length > 0) {
        payload.books = select;
      }
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/author/register`,
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

export default useAuthorsStore;
