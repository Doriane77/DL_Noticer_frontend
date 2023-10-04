import { create } from "zustand";
import axios from "axios";
import useUserStore from "../Stores/useUserStore";
import useAdminStore from "./useAdminStore";
const useMoviesStore = create((set, get) => ({
  movies: [],
  searchMovie: "",
  currentMovie: null,
  messageForm: null,
  searchMovies: (e) => set({ searchMovie: e.target.value }),
  supprimer: async (id) => {
    const { token } = useAdminStore.getState();
    if (!token) {
      set({ failMessage: "Utilisateur non authentifié ou token manquant." });
      return;
    }
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_URL}/movie/sup/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ messageForm: "Supprimer avec succès" });
    } catch (error) {
      set({
        failMessage: error?.response?.data?.message,
        messageForm: error?.response?.data?.message,
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
        title: data.title,
        synopsis: data.synopsis,
        image: data.image,
      };
      if (select && select.actors.length > 0) {
        payload.actors = select.actors;
      }
      if (select && select.directors.length > 0) {
        payload.director = select.directors[0];
      }
      const response = await axios.put(
        `${process.env.REACT_APP_URL}/movie/update`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ messageForm: "Film ajouter avec succès" });
    } catch (error) {
      set({
        failMessage: error?.response?.data?.message,
        messageForm: error?.response?.data?.message,
      });
    }
  },
  registerReview: async (message, movieId) => {
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
          movie: movieId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      set({
        failMessage: error?.response?.data?.message,
        messageForm: error?.response?.data?.message,
      });
    }
  },
  registerRatingMovie: async (value, movieId) => {
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
          movie: movieId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      set({
        failMessage: error?.response?.data?.message,
        messageForm: error?.response?.data?.message,
      });
    }
  },
  fetchOneMovie: async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/movie/one/${id}`
      );
      set({ currentMovie: response.data });
    } catch (error) {
      set({
        failMessage: error?.response?.data?.message,
        messageForm: error?.response?.data?.message,
      });
    }
  },
  fetchMoviesByTitle: async () => {
    const { searchMovie } = get();
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/movie/search`,
        {
          params: {
            title: searchMovie,
          },
        }
      );
      set({ movies: response.data });
    } catch (error) {
      set({
        failMessage: error?.response?.data?.message,
        messageForm: error?.response?.data?.message,
      });
    }
  },
  fetchAllMovies: async () => {
    try {
      const requete = await axios.get(`${process.env.REACT_APP_URL}/movie/all`);
      set({ movies: requete.data });
    } catch (error) {
      set({
        failMessage: error?.response?.data?.message,
        messageForm: error?.response?.data?.message,
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
        synopsis: data.synopsis,
        image: data.image,
      };
      if (select && select.actors.length > 0) {
        payload.actors = select.actors;
      }
      if (select && select.directors.length > 0) {
        payload.director = select.directors[0];
      }
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/movie/register`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ messageForm: "Film ajouter avec succès" });
    } catch (error) {
      set({
        failMessage: error?.response?.data?.message,
        messageForm: error?.response?.data?.message,
      });
    }
  },
}));

export default useMoviesStore;
