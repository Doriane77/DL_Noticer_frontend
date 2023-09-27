import React from "react";
import "./Sass/Footer.scss";
import ImgBox from "./Components/ImgBox";
import Logo from "./Assets/Logo.png";
export default function Footer() {
  return (
    <div className="Footer">
      <ImgBox
        image={Logo}
        desc="Lettre N avec un degradé violet bleu"
        navTo={"/"}
      />
      <p>Lollia Doriane - 2023 - </p>
      <p>
        Crédit:
        <a href="https://fr.freepik.com/vecteurs-libre/lignes-raccordement-reseau-fond-points_2302165.htm#query=fond%20violet%20bleu&position=25&from_view=keyword&track=ais">
          Image de kjpargeter
        </a>
        sur Freepik
      </p>
    </div>
  );
}
