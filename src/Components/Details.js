import React from "react";
import ImgBox from "./ImgBox";
import { Link } from "react-router-dom";

//  import "";
export default function Details({
  image,
  imgdesc,
  title,
  desc,
  creator,
  actors,
  page,
}) {
  console.log("creator: ", creator[0]);
  let write;
  let navTo;
  if (page === "Directors") {
    write = creator.director;
    navTo = `/director/detail/${creator._id}`;
  }
  if (page === "Authors") {
    write = creator[0].author;
    navTo = `/author/detail/${creator[0]._id}`;
  }
  if (page === "Books") {
    write = creator.title;
    navTo = `/book/detail/${creator._id}`;
  }
  if (page === "Movies") {
    write = creator.title;
    navTo = `/movie/detail/${creator._id}`;
  }
  if (page === "Actors") {
    write = creator.name + " " + creator.surname;
    navTo = `/actor/detail/${creator._id}`;
  }
  return (
    <acticle className="Details">
      <div>
        {image && <ImgBox image={image} desc={imgdesc} />}

        <div className="texts">
          <h1>{title}</h1>
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
    </acticle>
  );
}
