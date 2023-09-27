import axios from "axios";
import React, { useEffect, useState } from "react";
import ImgBox from "../Components/ImgBox";
import useHeaderStore from "../Stores/Header";
import InSearch from "../Components/InSearch";
import "../Sass/Pages/Books.scss";
import useBooksStore from "../Stores/useBooksStore";
export default function Books() {
  const books = useBooksStore((s) => s.books);
  const searchBooks = useBooksStore((s) => s.searchBooks);
  const fetchAllBooks = useBooksStore((s) => s.fetchAllBooks);
  const fetchBooksByTitle = useBooksStore((s) => s.fetchBooksByTitle);

  const close = useHeaderStore((state) => state.close);
  useEffect(() => {
    close();
    fetchAllBooks();
  }, [close]);

  useEffect(() => {
    fetchBooksByTitle();
  }, [searchBooks]);
  return (
    <div className="Books">
      <InSearch props={{ page: "Books", placeholder: "Rechercher" }} />

      <section>
        {books.length === 0 ? (
          <p>Pas de livre trouver</p>
        ) : (
          books.map((book) => {
            return (
              <article key={book._id}>
                <ImgBox image={book.image} desc={book.title} />
                <h2>{book.title}</h2>
              </article>
            );
          })
        )}
      </section>
    </div>
  );
}
