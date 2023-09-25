import React, { useEffect, useState } from "react";
import "../Sass/Pages/HomePage.scss";
import axios from "axios";

export default function HomePage() {
  const [dataMovies, setDataMovies] = useState([]);
  console.log("dataMovies: ", dataMovies);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const requete = await axios.get(
          `${process.env.REACT_APP_URL}/movie/all`
        );
        setDataMovies(requete.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      }
    };
    fetchMovies();
  }, []);
  return (
    <div className="HomePage">
      <section>
        <article>films</article>
      </section>
    </div>
  );
}
