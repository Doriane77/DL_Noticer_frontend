import React, { useEffect } from "react";
import useHeaderStore from "../Stores/Header";
import useDirectorsStore from "../Stores/useDirectorsStore";
import InSearch from "../Components/InSearch";
import ImgBox from "../Components/ImgBox";
import "../Sass/Pages/Director.scss";
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
      <InSearch props={{ page: "Director", placeholder: "Rechercher" }} />
      <section>
        {directors.length === 0 ? (
          <p>Aucun film trouver</p>
        ) : (
          directors.map((director) => {
            console.log("director: ", director);
            return (
              <article key={director._id}>
                <ImgBox image={director.image} desc={director.title} />
                <h2>{director.director}</h2>
              </article>
            );
          })
        )}
      </section>
    </div>
  );
}
