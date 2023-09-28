import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useMoviesStore from "../Stores/useMoviesStore";
import ArticlesOne from "../Components/ArticlesOne";
import "../Sass/Pages/OneMovie.scss";
import Details from "../Components/Details";
export default function OneMovie() {
  const { id } = useParams();
  const fetchOneMovie = useMoviesStore((state) => state.fetchOneMovie);
  const currentMovie = useMoviesStore((state) => state.currentMovie);
  console.log("currentMovie: ", currentMovie);
  useEffect(() => {
    fetchOneMovie(id);
  }, [id, fetchOneMovie]);

  if (!currentMovie) {
    return <p>Chargement...</p>;
  }
  return (
    <div className="OneMovie">
      <Details
        image={currentMovie.image}
        imgdesc={currentMovie.title}
        title={currentMovie.title}
        desc={currentMovie.synopsis}
        creator={currentMovie.director}
        actors={currentMovie.actors}
        page="Directors"
      />
    </div>
  );
}
