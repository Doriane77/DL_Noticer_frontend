import React from "react";
import ImgBox from "./ImgBox";
export default function ArticlesOne({ image, imgdesc, name, desc }) {
  return (
    <article>
      {image && <ImgBox image={image} desc={imgdesc} />}
      <div className="textBox">
        <h1>COLLECTION :</h1>
        <p>{name || ""}</p>
        <p>{desc}</p>
      </div>
    </article>
  );
}
