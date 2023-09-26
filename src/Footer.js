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
      <div className="BoxText">Lollia Doriane - 2023 - </div>
    </div>
  );
}
