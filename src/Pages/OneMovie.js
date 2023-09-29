import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useMoviesStore from "../Stores/useMoviesStore";
import ArticlesOne from "../Components/ArticlesOne";
import "../Sass/Pages/OneMovie.scss";
import Details from "../Components/Details";
import Reviews from "../Components/Reviews";
import useUserStore from "../Stores/useUserStore";
export default function OneMovie() {
  const { id } = useParams();
  const fetchOneMovie = useMoviesStore((state) => state.fetchOneMovie);
  const currentMovie = useMoviesStore((state) => state.currentMovie);
  const registerRatingMovie = useMoviesStore((s) => s.registerRatingMovie);
  const registerReview = useMoviesStore((s) => s.registerReview);
  const user = useUserStore((s) => s.user);

  const [newReviews, setNewReviews] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
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
