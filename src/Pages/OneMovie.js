import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useMoviesStore from "../Stores/useMoviesStore";
import ArticlesOne from "../Components/ArticlesOne";
import "../Sass/Pages/OneMovie.scss";
import Details from "../Components/Details";
import Reviews from "../Components/Reviews";
import useUserStore from "../Stores/useUserStore";
import FormGenerator from "../Components/FormGenerator";
import Liste from "../Components/Liste";
import useActorsStore from "../Stores/useActorsStore";
import useDirectorsStore from "../Stores/useDirectorsStore";
import useAdminStore from "../Stores/useAdminStore";
export default function OneMovie() {
  const { id } = useParams();

  const { admin } = useAdminStore();
  const user = useUserStore((s) => s.user);

  const [newReviews, setNewReviews] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  // update
  const {
    update,
    supprimer,
    fetchOneMovie,
    currentMovie,
    registerRatingMovie,
    registerReview,
    messageForm,
  } = useMoviesStore();
  const { actors, fetchAllActors } = useActorsStore();
  const { directors, fetchAllDirectors } = useDirectorsStore();

  const [formData, setFormData] = useState({});
  const [selectActor, setSelectedActor] = useState([]);
  const [selectDirector, setSelectedDirector] = useState([]);
  const fields = [
    { name: "title", label: "Titre du film", type: "text" },
    { name: "synopsis", label: "Synopsis", type: "text" },
    { name: "image", label: "Image url", type: "text" },
  ];
  useEffect(() => {
    fetchAllActors();
    fetchAllDirectors();
  }, [fetchAllActors, fetchAllDirectors]);
  useEffect(() => {
    let tabActor = [];
    if (currentMovie) {
      const { image, director, title, synopsis } = currentMovie;
      setFormData({ image, director, title, synopsis });
    }
    if (currentMovie && currentMovie.director) {
      setSelectedDirector([currentMovie.director._id]);
    }
    if (currentMovie && currentMovie.actors) {
      for (let i = 0; i < currentMovie.actors.length; i++) {
        tabActor.push(currentMovie.actors[i]._id);
      }
    }
    setSelectedActor(tabActor);
  }, [currentMovie]);
  const dataActor = actors;
  const dataDirector = directors;

  const handleFieldChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmiUpdate = (data) => {
    update(id, data, { directors: selectDirector, actors: selectActor });
  };

  const handleSelectActor = (clickedItem) => {
    const clickedItemId = clickedItem._id;
    if (selectActor.includes(clickedItemId)) {
      setSelectedActor(selectActor.filter((id) => id !== clickedItemId));
    } else {
      setSelectedActor([...selectActor, clickedItemId]);
    }
  };
  const handleSelectDirector = (clickedItem) => {
    const clickedItemId = clickedItem._id;
    if (selectDirector.includes(clickedItemId)) {
      setSelectedDirector(selectDirector.filter((id) => id !== clickedItemId));
    } else {
      setSelectedDirector([...selectDirector, clickedItemId]);
    }
  };
  // register
  useEffect(() => {
    fetchOneMovie(id);
  }, [id, fetchOneMovie]);
  useEffect(() => {
    if (rating !== 0) {
      registerRatingMovie(rating, currentMovie._id);
    }
  }, [rating, registerRatingMovie, currentMovie]);
  if (!currentMovie) {
    return <p>Chargement...</p>;
  }
  function handleSubmit(e) {
    e.preventDefault();
    registerReview(newReviews, currentMovie._id);
    setNewReviews("");
    setMessage("Merci pour votre critique !");
  }
  return (
    <div className="OneMovie">
      <h2>Films</h2>
      {admin && (
        <>
          <form
            className="upadateForm"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmiUpdate(formData);
            }}
          >
            <p className="Message">{messageForm}</p>
            <FormGenerator
              fields={fields}
              handleFieldChange={handleFieldChange}
              formData={formData}
            />

            <Liste
              titleListe={"Acteurs"}
              listes={dataActor}
              onSelect={handleSelectActor}
              selectedItems={selectActor}
            />
            <Liste
              titleListe={"Réalisateurs"}
              listes={dataDirector}
              onSelect={handleSelectDirector}
              selectedItems={selectDirector}
            />
            <button type="submit">Envoyer</button>
          </form>
          <button className="sup" onClick={() => supprimer(id)}>
            Supprimer
          </button>
        </>
      )}

      <Details
        image={currentMovie.image}
        imgdesc={currentMovie.title}
        title={currentMovie.title}
        desc={currentMovie.synopsis}
        creator={currentMovie.director}
        actors={currentMovie.actors}
        rating={currentMovie.rating}
        page="Directors"
      />
      {!user && (
        <p className="Message">
          Connecter vous pour laisser votre avis et noter l'œuvre !
        </p>
      )}
      {user && (
        <>
          <p className="Message">{message}</p>
          {rating === 0 && (
            <label>
              Noter le film :
              <select
                id="rating"
                onChange={(e) => setRating(Number(e.target.value))}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </label>
          )}
          <form>
            <textarea
              aria-label="Rédier votre critique"
              placeholder="Ecrire une nouvelle critique"
              value={newReviews}
              onChange={(e) => {
                setMessage("");
                setNewReviews(e.target.value);
              }}
            />
            <button
              className="submit"
              disabled={newReviews === ""}
              onClick={handleSubmit}
            >
              Enregistrer
            </button>
          </form>
        </>
      )}
      <Reviews reviews={currentMovie.reviews} />
    </div>
  );
}
