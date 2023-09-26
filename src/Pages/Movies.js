import axios from "axios";
import React, { useEffect, useState } from "react";
import ImgBox from "../Components/ImgBox";
import useHeaderStore from "../Stores/Header";
// import "";
export default function Movies() {
  const [dataMovies, setDataMovies] = useState([]);
  const close = useHeaderStore((state) => state.close);
  useEffect(() => {
    close();
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
      <div>Recherche</div>
      <section>
        {dataMovies.map((movie) => {
          // console.log("movie: ", movie);
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
