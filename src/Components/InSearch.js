import React from "react";
import "../Sass/Components/InSearch.scss";
import useMoviesStore from "../Stores/useMoviesStore";
import useBooksStore from "../Stores/useBooksStore";
export default function InSearch({ props }) {
  const { page, placeholder, textLabel } = props;
  const searchMovie = useMoviesStore((s) => s.searchMovie);
  const searchMovies = useMoviesStore((s) => s.searchMovies);
  const searchBook = useBooksStore((s) => s.searchBook);
  const searchBooks = useBooksStore((s) => s.searchBooks);

  let searchIn;
  let changeIn;
  if (page === "Movies") {
    searchIn = searchMovie;
    changeIn = searchMovies;
  }
  if (page === "Books") {
    searchIn = searchBook;
    changeIn = searchBooks;
  }
  return (
    <input
      type="text"
      placeholder={placeholder}
      aria-label={textLabel}
      value={searchIn}
      onChange={changeIn}
    />
  );
}
