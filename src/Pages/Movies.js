import React, { useEffect, useState } from "react";
import "../Sass/Pages/Movies.scss";
import axios from "axios";

import ImgBox from "../Components/ImgBox";
import useHeaderStore from "../Stores/Header";
import InSearch from "../Components/InSearch";
import useMoviesStore from "../Stores/useMoviesStore";
import Sections from "../Components/Sections";

export default function Movies() {
  const movies = useMoviesStore((s) => s.movies);
  const searchMovie = useMoviesStore((s) => s.searchMovie);
  const fetchAllMovies = useMoviesStore((s) => s.fetchAllMovies);
  const fetchMoviesByTitle = useMoviesStore((s) => s.fetchMoviesByTitle);
  const close = useHeaderStore((s) => s.close);

  useEffect(() => {
    close();
    fetchAllMovies();
  }, [close, fetchAllMovies]);
  useEffect(() => {
    fetchMoviesByTitle();
  }, [searchMovie]);
  return (
    <div className="Movies">
      <InSearch props={{ page: "Movies", placeholder: "Rechercher" }} />
      <Sections props={{ page: "Movies", data: movies }} />
    </div>
  );
}
