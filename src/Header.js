import React from "react";
import "./Sass/Header.scss";
import { Link } from "react-router-dom";
import Logo from "./Assets/Logo.png";
import ImgBox from "./Components/ImgBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useHeaderStore from "./Stores/Header";

function Header() {
  const { seeMenu, invertSeeMenu } = useHeaderStore();
  console.log("seeMenu: ", seeMenu);

  return (
    <div className="Header">
      <ImgBox
        image={Logo}
        desc="Lettre N avec un degradé violet bleu"
        navTo={"/"}
      />
      <div className="boxNav">
        <FontAwesomeIcon
          className="FIcon"
          icon="fa-solid fa-bars"
          onClick={invertSeeMenu}
        />
        <nav className={seeMenu ? "BoxLink activate" : "BoxLink deactivate"}>
          <Link className="link" to="/">
            Acceuil
          </Link>
          <Link className="link" to="/movies">
            Film
          </Link>
          <Link className="link" to="/books">
            Livre
          </Link>
          <Link className="link" to="/actors">
            Acteur
          </Link>
          <Link className="link" to="/director">
            Réalisateur
          </Link>
          <Link className="link" to="/authors">
            Autheur
          </Link>
        </nav>
        <button className="BLogin">
          <FontAwesomeIcon className="userIcon" icon="fa-solid fa-user" />
          <p>LOGIN</p>
        </button>
      </div>
    </div>
  );
}
export default Header;
