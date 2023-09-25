import React from "react";
import "../Sass/Components/ImgBox.scss";
export default function ImgBox({ image, desc }) {
  return (
    <div className="ImgBox">
      <img src={image} alt={desc} />
    </div>
  );
}
