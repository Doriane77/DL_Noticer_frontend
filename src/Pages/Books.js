import axios from "axios";
import React, { useEffect, useState } from "react";
import ImgBox from "../Components/ImgBox";
// import "";
export default function Books() {
  const [dataBooks, setDataBooks] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const requete = await axios.get(
          `${process.env.REACT_APP_URL}/book/all`
        );
        setDataBooks(requete.data);
      } catch (error) {
        console.error("Erreur :", error);
      }
    };
    fetchMovies();
  }, []);
  return (
    <div className="Books">
      <section>
        {dataBooks.map((book) => {
          console.log("book: ", book);
          return (
            <article>
              <ImgBox image={book.image} desc={book.title} />
              <h2>{book.title}</h2>
            </article>
          );
        })}
      </section>
    </div>
  );
}
