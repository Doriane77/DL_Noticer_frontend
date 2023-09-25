import React from "react";
export default function ImgBox({ image, desc }) {
  return (
    <div className="ImgBox">
      <img src={image} alt={desc} />
    </div>
  );
}
