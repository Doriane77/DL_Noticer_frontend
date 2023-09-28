import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useActorsStore from "../Stores/useActorsStore";
import ArticlesOne from "../Components/ArticlesOne";
import Sections from "../Components/Sections";
import "../Sass/Pages/OneActor.scss";
export default function OneActor() {
  const { id } = useParams();
  const fetchOneActor = useActorsStore((state) => state.fetchOneActor);
  const currentActor = useActorsStore((state) => state.currentActor);
  console.log("currentActor: ", currentActor);
  useEffect(() => {
    fetchOneActor(id);
  }, [id, fetchOneActor]);
  let dataMovies = [];
  if (!currentActor) {
    return <p>Chargement...</p>;
  } else {
    dataMovies = currentActor.movies;
  }
  return (
    <div className="OneActor">
      <ArticlesOne
        image={currentActor.image}
        imgdesc={currentActor.name + " " + currentActor.surname}
        name={currentActor.name + " " + currentActor.surname}
      />
      {dataMovies.lenght !== 0 && (
        <Sections props={{ data: dataMovies, page: "Movies" }} />
      )}
    </div>
  );
}
