import { create } from "zustand";
import axios from "axios";
const useMoviesStore = create((set, get) => ({
  movies: [],
  searchMovie: "",
  searchMovies: (e) => set({ searchMovie: e.target.value }),
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
