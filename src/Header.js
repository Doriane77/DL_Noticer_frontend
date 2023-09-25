import React from "react";
import "./Sass/Header.scss";
import { Link } from "react-router-dom";
import Logo from "./Assets/Logo.png";
import ImgBox from "./Components/ImgBox";

function Header() {
  return (
    <div className="Header">
      <ImgBox image={Logo} desc="Lettre N avec un degradé violet bleu" />
      <nav>
        <Link to="/movies">Films</Link>
        <Link to="/books">Livres</Link>
        <Link to="/authors">Autheurs</Link>
        <Link to="/director">Realisateur</Link>
        <Link to="/actor">Acteurs</Link>
      </nav>
      <button>Login</button>
    </div>
  );
}
export default Header;
