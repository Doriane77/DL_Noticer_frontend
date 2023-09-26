import React from "react";
import "../Sass/Components/ImgBox.scss";
import { useNavigate } from "react-router-dom";
export default function ImgBox({ image, desc, navTo }) {
  let navigate = useNavigate();
  return (
    <div className="ImgBox" onClick={() => navigate(navTo)}>
      <img src={image} alt={desc} />
    </div>
  );
}
