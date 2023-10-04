import React, { useEffect, useState } from "react";
import "../Sass/Pages/OneActor.scss";
import { useParams } from "react-router-dom";
import useActorsStore from "../Stores/useActorsStore";
import ArticlesOne from "../Components/ArticlesOne";
import Sections from "../Components/Sections";
import useMoviesStore from "../Stores/useMoviesStore";
import FormGenerator from "../Components/FormGenerator";
import Liste from "../Components/Liste";
import useAdminStore from "../Stores/useAdminStore";
export default function OneActor() {
  const { id } = useParams();
  const { admin } = useAdminStore();

  const { movies, fetchAllMovies } = useMoviesStore();
  const { update, supprimer, fetchOneActor, currentActor, messageForm } =
    useActorsStore();

  // Uptdate
  const [formData, setFormData] = useState({});
  const [select, setSelected] = useState([]);
  const fields = [
    { name: "name", label: "Nom ", type: "text" },
    { name: "surname", label: "Prénom", type: "text" },
    { name: "image", label: "Image url", type: "text" },
  ];
  useEffect(() => {
    fetchAllMovies();
  }, [fetchAllMovies]);
  useEffect(() => {
    let tab = [];
    if (currentActor) {
      const { image, name, surname } = currentActor;
      setFormData({ image, name, surname });
    }
    if (currentActor && currentActor.movies) {
      for (let i = 0; i < currentActor.movies.length; i++) {
        tab.push(currentActor.movies[i]._id);
      }
    }
    setSelected(tab);
  }, [currentActor]);

  const dataMovie = movies;

  const handleFieldChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (data) => {
    update(id, data, { select: select });
  };
  const handleSelect = (clickedItem) => {
    const clickedItemId = clickedItem._id;
    if (select.includes(clickedItemId)) {
      setSelected(select.filter((id) => id !== clickedItemId));
    } else {
      setSelected([...select, clickedItemId]);
    }
  };

  // Register
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
      <h2>Acteur</h2>
      {admin && (
        <>
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
              onSelect={handleSelect}
              selectedItems={select}
            />
            <button type="submit">Envoyer</button>
          </form>
          <button className="sup" onClick={() => supprimer(id)}>
            Supprimer
          </button>
        </>
      )}

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
