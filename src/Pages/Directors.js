import React, { useEffect } from "react";
import useHeaderStore from "../Stores/Header";
import useDirectorsStore from "../Stores/useDirectorsStore";
import InSearch from "../Components/InSearch";
import ImgBox from "../Components/ImgBox";
import "../Sass/Pages/Directors.scss";
import Sections from "../Components/Sections";
export default function Director() {
  const directors = useDirectorsStore((s) => s.directors);
  const searchDirector = useDirectorsStore((s) => s.searchDirector);
  const fetchAllDirectors = useDirectorsStore((s) => s.fetchAllDirectors);
  const fetchDirectorsByTitle = useDirectorsStore(
    (s) => s.fetchDirectorsByTitle
  );
  const close = useHeaderStore((s) => s.close);

  useEffect(() => {
    close();
    fetchAllDirectors();
  }, [close, fetchAllDirectors]);
  useEffect(() => {
    fetchDirectorsByTitle();
  }, [searchDirector]);
  return (
    <div className="Directors">
      <InSearch props={{ page: "Directors", placeholder: "Rechercher" }} />
      <Sections props={{ data: directors, page: "Directors" }} />
    </div>
  );
}
