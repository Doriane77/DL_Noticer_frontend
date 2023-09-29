import React from "react";
import "./Sass/Header.scss";
import { Link } from "react-router-dom";
import Logo from "./Assets/Logo.png";
import ImgBox from "./Components/ImgBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useHeaderStore from "./Stores/Header";
import useUserStore from "./Stores/useUserStore";

function Header() {
  const { seeMenu, invertSeeMenu } = useHeaderStore();
  const { open } = useUserStore();
  const user = useUserStore((s) => s.user);
  console.log("user: ", user);
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
        {user ? (
          <button className="User" onClick={() => open()}>
            {user.username} ♥
          </button>
        ) : (
          <button className="BLogin" onClick={() => open()}>
            <FontAwesomeIcon className="userIcon" icon="fa-solid fa-user" />
            <p>LOGIN</p>
          </button>
        )}
      </div>
    </div>
  );
}
export default Header;
