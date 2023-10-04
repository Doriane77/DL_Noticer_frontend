import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useBooksStore from "../Stores/useBooksStore";
import useUserStore from "../Stores/useUserStore";
import Details from "../Components/Details";
import "../Sass/Pages/OneBook.scss";
import Reviews from "../Components/Reviews";
import AdminButton from "../Components/AdminButton";
import FormGenerator from "../Components/FormGenerator";
import Liste from "../Components/Liste";
import useAuthorsStore from "../Stores/useAuthorsStore";

export default function OneBook() {
  const { id } = useParams();
  const { authors, fetchAllAuthors } = useAuthorsStore();

  const {
    update,
    supprimer,
    messageForm,
    registerReview,
    registerRatingBook,
    fetchOnebook,
    currentBook,
  } = useBooksStore();
  const user = useUserStore((s) => s.user);

  const [newReviews, setNewReviews] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  // update
  const [formData, setFormData] = useState({});
  const [selectAuthor, setSelectedAuthor] = useState([]);
  const fields = [
    { name: "title", label: "Titre du Livre", type: "text" },
    { name: "summary", label: "Résumer", type: "text" },
    { name: "image", label: "Image url", type: "text" },
  ];
  useEffect(() => {
    fetchAllAuthors();
  }, [fetchAllAuthors]);
  useEffect(() => {
    let tab = [];
    if (currentBook) {
      const { image, title, summary } = currentBook;
      setFormData({ title, image, summary });
    }
    if (currentBook && currentBook.author) {
      for (let i = 0; i < currentBook.author.length; i++) {
        tab.push(currentBook.author[i]._id);
      }
    }
    setSelectedAuthor(tab);
  }, [currentBook]);
  const dataAuthors = authors;
  const handleFieldChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitModif = (data) => {
    update(id, data, { authors: selectAuthor });
  };

  const handleSelectAuthor = (clickedItem) => {
    const clickedItemId = clickedItem._id;
    if (selectAuthor.includes(clickedItemId)) {
      setSelectedAuthor(selectAuthor.filter((id) => id !== clickedItemId));
    } else {
      setSelectedAuthor([...selectAuthor, clickedItemId]);
    }
  };

  // deuxième formulaire
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
      <h2>Livre</h2>
      <form
        className="upadateForm"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitModif(formData);
        }}
      >
        <p className="message">{messageForm}</p>
        <FormGenerator
          fields={fields}
          handleFieldChange={handleFieldChange}
          formData={formData}
        />

        <Liste
          titleListe={"Autheur"}
          listes={dataAuthors}
          onSelect={handleSelectAuthor}
          selectedItems={selectAuthor}
        />

        <button type="submit">Envoyer</button>
      </form>
      <button className="sup" onClick={() => supprimer(id)}>
        Supprimer
      </button>
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
