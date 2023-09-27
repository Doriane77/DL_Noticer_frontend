import React, { useEffect } from "react";
import useHeaderStore from "../Stores/Header";
import useAuthorsStore from "../Stores/useAuthorsStore";
import InSearch from "../Components/InSearch";
import ImgBox from "../Components/ImgBox";
import "../Sass/Pages/Authors.scss";
export default function Authors() {
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
      <section>
        {authors.length === 0 ? (
          <p>Aucun film trouver</p>
        ) : (
          authors.map((author) => {
            return (
              <article key={author._id}>
                <ImgBox image={author.image} desc={author.title} />
                <h2>{author.author}</h2>
              </article>
            );
          })
        )}
      </section>
    </div>
  );
}
