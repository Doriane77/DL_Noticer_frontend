import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useBooksStore from "../Stores/useBooksStore";
import Details from "../Components/Details";
import "../Sass/Pages/OneBook.scss";
import Reviews from "../Components/Reviews";
export default function OneBook() {
  const { id } = useParams();
  const fetchOnebook = useBooksStore((state) => state.fetchOnebook);
  const currentBook = useBooksStore((state) => state.currentBook);
  console.log("currentBook: ", currentBook);
  useEffect(() => {
    fetchOnebook(id);
  }, [id, fetchOnebook]);

  if (!currentBook) {
    return <p>Chargement...</p>;
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
      <Reviews reviews={currentBook.reviews} />
    </div>
  );
}
