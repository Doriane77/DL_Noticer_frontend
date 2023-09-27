import React from "react";
import ImgBox from "./ImgBox";
import { useNavigate } from "react-router-dom";
//  import "";
export default function Sections({ props }) {
  const { data, page } = props;
  let navigate = useNavigate();
  return (
    <section>
      {data.length === 0 ? (
        <p>Aucun film trouver</p>
      ) : (
        data.map((elem) => {
          let write;
          let navTo;
          if (page === "Directors") {
            write = elem.director;
            navTo = `/director/detail/${elem._id}`;
          }
          if (page === "Authors") {
            write = elem.author;
            navTo = `/author/detail/${elem._id}`;
          }
          if (page === "Books") {
            write = elem.title;
            navTo = `/book/detail/${elem._id}`;
          }
          if (page === "Movies") {
            write = elem.title;
            navTo = `/movie/detail/${elem._id}`;
          }
          if (page === "Actors") {
            write = elem.name + " " + elem.surname;
            navTo = `/actor/detail/${elem._id}`;
          }
          return (
            <article key={elem._id} onClick={() => navigate(navTo)}>
              <ImgBox image={elem.image} desc={elem.title} />
              <h2>{write}</h2>
            </article>
          );
        })
      )}
    </section>
  );
}
