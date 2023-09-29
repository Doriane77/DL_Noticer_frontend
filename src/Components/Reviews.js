import React from "react";

export default function Reviews({ reviews }) {
  return (
    <div className="Reviews">
      {reviews.map((review) => {
        console.log("review: ", review);
        return (
          <article key={review._id}>
            <p className="message">{review.message}</p>
            <p className="date">
              Poster: {" " + review.date.time}h{review.date.minute} le{" "}
              {review.date.day}/{review.date.month}/{review.date.year}
            </p>
          </article>
        );
      })}
    </div>
  );
}
