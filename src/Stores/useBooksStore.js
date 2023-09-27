import { create } from "zustand";
import axios from "axios";
const useBooksStore = create((set, get) => ({
  books: [],
  searchBook: "",
  searchBooks: (e) => set({ searchBook: e.target.value }),
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
