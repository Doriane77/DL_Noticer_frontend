import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useBooksStore from "../Stores/useBooksStore";
import useUserStore from "../Stores/useUserStore";
import Details from "../Components/Details";
import "../Sass/Pages/OneBook.scss";
import Reviews from "../Components/Reviews";

export default function OneBook() {
  const { id } = useParams();
  const fetchOnebook = useBooksStore((state) => state.fetchOnebook);
  const currentBook = useBooksStore((state) => state.currentBook);
  const registerRatingBook = useBooksStore((s) => s.registerRatingBook);
  const registerReview = useBooksStore((s) => s.registerReview);

  const user = useUserStore((s) => s.user);

  const [newReviews, setNewReviews] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchOnebook(id);
  }, [id, fetchOnebook]);
  useEffect(() => {
    if (rating !== 0) {
      registerRatingBook(rating, currentBook._id);
    }
  }, [rating, registerRatingBook, currentBook]);

  if (!currentBook) {
    return <p>Chargement...</p>;
  }
  function handleSubmit(e) {
    e.preventDefault();
    registerReview(newReviews, currentBook._id);
    setNewReviews("");
    setMessage("Merci pour votre critique !");
  }
  return (
    <div className="OneBook">
      <Details
        image={currentBook.image}
        imgdesc={currentBook.title}
        title={currentBook.title}
        desc={currentBook.summary}
        creator={currentBook.author}
        rating={currentBook.rating}
        page="Authors"
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

      <Reviews reviews={currentBook.reviews} />
    </div>
  );
}
