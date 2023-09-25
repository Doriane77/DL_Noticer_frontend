import axios from "axios";
import React, { useEffect, useState } from "react";
import ImgBox from "../Components/ImgBox";
// import "";
export default function Movies() {
  const [dataMovies, setDataMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const requete = await axios.get(
          `${process.env.REACT_APP_URL}/movie/all`
        );
        setDataMovies(requete.data);
      } catch (error) {
        console.error("Erreur :", error);
      }
    };
    fetchMovies();
  }, []);
  return (
    <div className="Movies">
      <div>REcherche</div>
      <section>
        {dataMovies.map((movie) => {
          console.log("movie: ", movie);
          return (
            <article>
              <ImgBox image={movie.image} desc={movie.title} />
              <h2>{movie.title}</h2>
            </article>
          );
        })}
      </section>
    </div>
  );
}
