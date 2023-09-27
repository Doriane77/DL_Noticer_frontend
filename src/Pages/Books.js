import axios from "axios";
import React, { useEffect, useState } from "react";
import ImgBox from "../Components/ImgBox";
import useHeaderStore from "../Stores/Header";
import InSearch from "../Components/InSearch";
import "../Sass/Pages/Books.scss";
import useBooksStore from "../Stores/useBooksStore";
import Sections from "../Components/Sections";
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
      <Sections props={{ page: "Books", data: books }} />
    </div>
  );
}
