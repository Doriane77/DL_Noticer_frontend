import React from "react";
import "../Sass/Components/InSearch.scss";
import useMoviesStore from "../Stores/useMoviesStore";
import useBooksStore from "../Stores/useBooksStore";
import useActorsStore from "../Stores/useActorsStore";
import useDirectorsStore from "../Stores/useDirectorsStore";
import useAuthorsStore from "../Stores/useAuthorsStore";
export default function InSearch({ props }) {
  const { page, placeholder, textLabel } = props;
  const searchMovie = useMoviesStore((s) => s.searchMovie);
  const searchMovies = useMoviesStore((s) => s.searchMovies);
  const searchBook = useBooksStore((s) => s.searchBook);
  const searchBooks = useBooksStore((s) => s.searchBooks);
  const searchActor = useActorsStore((s) => s.searchActor);
  const searchActors = useActorsStore((s) => s.searchActors);
  const searchDirector = useDirectorsStore((s) => s.searchDirector);
  const searchDirectors = useDirectorsStore((s) => s.searchDirectors);

  const searchAuthor = useAuthorsStore((s) => s.searchAuthor);
  const searchAuthors = useAuthorsStore((s) => s.searchAuthors);

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
  if (page === "Actors") {
    searchIn = searchActor;
    changeIn = searchActors;
  }
  if (page === "Directors") {
    searchIn = searchDirector;
    changeIn = searchDirectors;
  }
  if (page === "Authors") {
    searchIn = searchAuthor;
    changeIn = searchAuthors;
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
