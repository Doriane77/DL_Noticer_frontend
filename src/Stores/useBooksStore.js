import { create } from "zustand";
import axios from "axios";
import useUserStore from "../Stores/useUserStore";
import useAdminStore from "./useAdminStore";
const useBooksStore = create((set, get) => ({
  books: [],
  searchBook: "",
  currentBook: null,
  messageForm: null,
  searchBooks: (e) => set({ searchBook: e.target.value }),
  supprimer: async (id) => {
    const { token } = useAdminStore.getState();
    if (!token) {
      set({ failMessage: "Utilisateur non authentifié ou token manquant." });
      return;
    }
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_URL}/book/sup/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ messageForm: "Supprimer avec succès" });
    } catch (error) {
      set({
        messageForm: error?.response?.data?.message,
        failMessage: error.response.data.message,
      });
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
        author: data.author,
        image: data.image,
        summary: data.summary,
      };
      if (select && select.authors.length > 0) {
        payload.author = select.authors;
      } else {
        payload.author = [];
      }
      const response = await axios.put(
        `${process.env.REACT_APP_URL}/book/update`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ messageForm: "Modifier avec succès" });
    } catch (error) {
      set({
        messageForm: error?.response?.data?.message,
        failMessage: error.response.data.message,
      });
    }
  },
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
      set({
        messageForm: error?.response?.data?.message,
        failMessage: error.response.data.message,
      });
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
      set({
        messageForm: error?.response?.data?.message,
        failMessage: error.response.data.message,
      });
    }
  },
  fetchOnebook: async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/book/one/${id}`
      );
      set({ currentBook: response.data });
    } catch (error) {
      set({
        messageForm: error?.response?.data?.message,
        failMessage: error.response.data.message,
      });
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
      set({
        messageForm: error?.response?.data?.message,
        failMessage: error.response.data.message,
      });
    }
  },
  fetchAllBooks: async () => {
    try {
      const requete = await axios.get(`${process.env.REACT_APP_URL}/book/all`);
      set({ books: requete.data });
    } catch (error) {
      set({
        messageForm: error?.response?.data?.message,
        failMessage: error.response.data.message,
      });
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
        title: data.title,
        summary: data.summary,
        image: data.image,
      };
      if (select && select.authors.length > 0) {
        payload.author = select.authors;
      }
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/book/register`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ messageForm: "Enregistrer avec succès" });
    } catch (error) {
      set({
        messageForm: error?.response?.data?.message,
        failMessage: error.response.data.message,
      });
    }
  },
}));

export default useBooksStore;
