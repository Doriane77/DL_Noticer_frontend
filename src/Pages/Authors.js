import React, { useEffect } from "react";
import useHeaderStore from "../Stores/Header";
import useAuthorsStore from "../Stores/useAuthorsStore";
import InSearch from "../Components/InSearch";
import ImgBox from "../Components/ImgBox";
import "../Sass/Pages/Authors.scss";
import { useNavigate } from "react-router-dom";
import Sections from "../Components/Sections";
export default function Authors() {
  let navigate = useNavigate();
  const authors = useAuthorsStore((s) => s.authors);
  const searchAuthor = useAuthorsStore((s) => s.searchAuthor);
  const fetchAllAuthors = useAuthorsStore((s) => s.fetchAllAuthors);
  const fetchAuthorsByTitle = useAuthorsStore((s) => s.fetchAuthorsByTitle);
  const close = useHeaderStore((s) => s.close);

  useEffect(() => {
    close();
    fetchAllAuthors();
  }, [close, fetchAllAuthors]);
  useEffect(() => {
    fetchAuthorsByTitle();
  }, [searchAuthor]);
  return (
    <div className="Authors">
      <InSearch props={{ page: "Authors", placeholder: "Rechercher" }} />
      <Sections props={{ page: "Authors", data: authors }} />
    </div>
  );
}
