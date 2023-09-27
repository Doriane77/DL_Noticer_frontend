import React, { useEffect, useState } from "react";
import "../Sass/Pages/Movies.scss";
import axios from "axios";

import ImgBox from "../Components/ImgBox";
import useHeaderStore from "../Stores/Header";
import InSearch from "../Components/InSearch";
import useMoviesStore from "../Stores/useMoviesStore";

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
      <section>
        {movies.length === 0 ? (
          <p>Aucun film trouver</p>
        ) : (
          movies.map((movie) => {
            return (
              <article key={movie._id}>
                <ImgBox image={movie.image} desc={movie.title} />
                <h2>{movie.title}</h2>
              </article>
            );
          })
        )}
      </section>
    </div>
  );
}
