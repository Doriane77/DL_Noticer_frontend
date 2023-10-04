import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDirectorsStore from "../Stores/useDirectorsStore";
import ArticlesOne from "../Components/ArticlesOne";
import Sections from "../Components/Sections";
import "../Sass/Pages/OneDirector.scss";
import FormGenerator from "../Components/FormGenerator";
import Liste from "../Components/Liste";
import useMoviesStore from "../Stores/useMoviesStore";
export default function OneDirector() {
  const { id } = useParams();

  const { movies, fetchAllMovies } = useMoviesStore();
  const { update, supprimer, messageForm, currentDirector, fetchOneDiretor } =
    useDirectorsStore();

  //update
  const [formData, setFormData] = useState({});
  const [selectMovie, setSelectedMovie] = useState([]);
  const fields = [
    { name: "director", label: "Titre du film", type: "text" },
    { name: "image", label: "Image url", type: "text" },
  ];
  useEffect(() => {
    fetchAllMovies();
  }, [fetchAllMovies]);
  useEffect(() => {
    let tab = [];
    if (currentDirector) {
      const { image, director } = currentDirector;
      setFormData({ director, image });
    }
    if (currentDirector && currentDirector.movies) {
      for (let i = 0; i < currentDirector.movies.length; i++) {
        tab.push(currentDirector.movies[i]._id);
      }
    }
    setSelectedMovie(tab);
  }, [currentDirector]);
  const dataMovie = movies;

  const handleFieldChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (data) => {
    update(id, data, { movies: selectMovie });
  };
  const handleSelectMovie = (clickedItem) => {
    const clickedItemId = clickedItem._id;
    if (selectMovie.includes(clickedItemId)) {
      setSelectedMovie(selectMovie.filter((id) => id !== clickedItemId));
    } else {
      setSelectedMovie([...selectMovie, clickedItemId]);
    }
  };

  // Register
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
      <h2>Réalisateur</h2>
      <form
        className="upadateForm"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(formData);
        }}
      >
        <p className="Message">{messageForm}</p>
        <FormGenerator
          fields={fields}
          handleFieldChange={handleFieldChange}
          formData={formData}
        />
        <Liste
          titleListe={"Films"}
          listes={dataMovie}
          onSelect={handleSelectMovie}
          selectedItems={selectMovie}
        />

        <button type="submit">Envoyer</button>
      </form>
      <button className="sup" onClick={() => supprimer(id)}>
        Supprimer
      </button>
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
