import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useMoviesStore from "../Stores/useMoviesStore";
//  import "";
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
  return <div className="OneMovie">OneMovie </div>;
}
