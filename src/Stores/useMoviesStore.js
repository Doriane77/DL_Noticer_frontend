import { create } from "zustand";
import axios from "axios";
import useUserStore from "../Stores/useUserStore";
const useMoviesStore = create((set, get) => ({
  movies: [],
  searchMovie: "",
  currentMovie: null,
  searchMovies: (e) => set({ searchMovie: e.target.value }),
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
      console.error("Erreur :", error);
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
      console.error("Erreur :", error);
    }
  },
  fetchOneMovie: async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/movie/one/${id}`
      );
      set({ currentMovie: response.data });
    } catch (error) {
      console.error("Erreur :", error);
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
      console.error("Erreur :", error);
    }
  },
  fetchAllMovies: async () => {
    try {
      const requete = await axios.get(`${process.env.REACT_APP_URL}/movie/all`);
      set({ movies: requete.data });
    } catch (error) {
      console.error("Erreur :", error);
    }
  },
}));

export default useMoviesStore;
