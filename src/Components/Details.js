import React from "react";
import ImgBox from "./ImgBox";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Details({
  image,
  imgdesc,
  title,
  desc,
  creator,
  actors,
  page,
  rating,
}) {
  let write;
  let navTo;

  if (page === "Directors") {
    if (creator) {
      write = creator.director || " ";
      navTo = `/director/detail/${creator._id}`;
    }
  }
  if (page === "Authors") {
    if (creator && creator.length > 0 && creator[0]) {
      write = creator[0].author || " ";
      navTo = `/author/detail/${creator[0]._id}`;
    }
  }
  if (page === "Books") {
    if (creator) {
      write = creator.title || " ";
      navTo = `/book/detail/${creator._id}`;
    }
  }
  if (page === "Movies") {
    if (creator) {
      write = creator.title || " ";
      navTo = `/movie/detail/${creator._id}`;
    }
  }
  if (page === "Actors") {
    if (creator) {
      write = (creator.name || "") + " " + (creator.surname || "");
      navTo = `/actor/detail/${creator._id}`;
    }
  }
  return (
    <article className="Details">
      <div>
        {image && <ImgBox image={image} desc={imgdesc} />}

        <div className="texts">
          <h1>{title}</h1>
          <p>
            <FontAwesomeIcon className="starIcon" icon="fa-solid fa-star" />
            {rating === 0 ? "aucune notes" : `${rating} / 5`}
          </p>
          <Link className="link" to={navTo}>
            {write}
          </Link>
          {actors &&
            actors.map((actor) => {
              return (
                <Link
                  className="link"
                  to={`/actor/detail/${actor._id}`}
                  key={actor._id}
                >
                  {actor.name + " " + actor.surname}
                </Link>
              );
            })}
        </div>
      </div>
      <p className="Desc">{desc}</p>
    </article>
  );
}
