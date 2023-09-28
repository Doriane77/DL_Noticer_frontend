import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAuthorsStore from "../Stores/useAuthorsStore";
import Sections from "../Components/Sections";
import "../Sass/Pages/OneAuthor.scss";
import ImgBox from "../Components/ImgBox";
import ArticlesOne from "../Components/ArticlesOne";
export default function OneAuthor() {
  const { id } = useParams();
  const fetchOneAuthor = useAuthorsStore((state) => state.fetchOneAuthor);
  const currentAuthor = useAuthorsStore((state) => state.currentAuthor);
  console.log("currentAuthor: ", currentAuthor);
  let dataBook = [];
  useEffect(() => {
    fetchOneAuthor(id);
  }, [id, fetchOneAuthor]);

  if (!currentAuthor) {
    return <p>Chargement...</p>;
  } else {
    dataBook = currentAuthor.books;
  }
  return (
    <div className="OneAuthor">
      <ArticlesOne
        image={currentAuthor.image}
        imgdesc={currentAuthor.author}
        name={currentAuthor.author}
      />
      {dataBook.lenght !== 0 && (
        <Sections props={{ data: dataBook, page: "Books" }} />
      )}
    </div>
  );
}
