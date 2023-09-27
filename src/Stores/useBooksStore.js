import { create } from "zustand";
import axios from "axios";
const useBooksStore = create((set, get) => ({
  books: [],
  searchBook: "",
  currentBook: null,
  searchBooks: (e) => set({ searchBook: e.target.value }),
  fetchOnebook: async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/book/one/${id}`
      );
      set({ currentBook: response.data });
    } catch (error) {
      console.error("Erreur :", error);
    }
  },
  fetchBooksByTitle: async () => {
    const { searchBook } = get();
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/book/search`,
        {
          params: {
            title: searchBook,
          },
        }
      );
      set({ books: response.data });
    } catch (error) {
      console.error("Erreur :", error);
    }
  },
  fetchAllBooks: async () => {
    try {
      const requete = await axios.get(`${process.env.REACT_APP_URL}/book/all`);
      set({ books: requete.data });
    } catch (error) {
      console.error("Erreur :", error);
    }
  },
}));

export default useBooksStore;
