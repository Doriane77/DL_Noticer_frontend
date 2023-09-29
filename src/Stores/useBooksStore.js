import { create } from "zustand";
import axios from "axios";
import useUserStore from "../Stores/useUserStore";
const useBooksStore = create((set, get) => ({
  books: [],
  searchBook: "",
  currentBook: null,
  searchBooks: (e) => set({ searchBook: e.target.value }),
  registerReview: async (message, bookId) => {
    const { user, token } = useUserStore.getState();
    if (!user || !token) {
      console.error("Utilisateur non authentifié ou token manquant.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/reviews/register`,
        {
          message: message,
          user: user.id,
          book: bookId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Erreur :", error);
    }
  },
  registerRatingBook: async (value, bookId) => {
    const { user, token } = useUserStore.getState();
    if (!user || !token) {
      console.error("Utilisateur non authentifié ou token manquant.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/rating/register`,
        {
          user: user.id,
          value: value,
          book: bookId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Erreur :", error);
    }
  },
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
