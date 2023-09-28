import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useDirectorsStore from "../Stores/useDirectorsStore";
import ArticlesOne from "../Components/ArticlesOne";
import Sections from "../Components/Sections";
import "../Sass/Pages/OneDirector.scss";
export default function OneDirector() {
  const { id } = useParams();
  const fetchOneDiretor = useDirectorsStore((state) => state.fetchOneDiretor);
  const currentDirector = useDirectorsStore((state) => state.currentDirector);
  console.log("currentDirector: ", currentDirector);
  useEffect(() => {
    fetchOneDiretor(id);
  }, [id, fetchOneDiretor]);
  let dataMovies = [];
  if (!currentDirector) {
    return <p>Chargement...</p>;
  } else {
    dataMovies = currentDirector.movies;
  }
  return (
    <div className="OneDirector">
      <ArticlesOne
        image={currentDirector.image}
        imgdesc={currentDirector.director}
        name={currentDirector.director}
      />
      {dataMovies.lenght !== 0 && (
        <Sections props={{ data: dataMovies, page: "Movies" }} />
      )}
    </div>
  );
}
