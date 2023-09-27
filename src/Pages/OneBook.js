import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useBooksStore from "../Stores/useBooksStore";
//  import "";
export default function OneBook() {
  const { id } = useParams();
  const fetchOnebook = useBooksStore((state) => state.fetchOnebook);
  const currentBook = useBooksStore((state) => state.currentBook);
  console.log("currentBook: ", currentBook);
  useEffect(() => {
    fetchOnebook(id);
  }, [id, fetchOnebook]);

  if (!currentBook) {
    return <p>Chargement...</p>;
  }
  return <div className="OneBook">OneBook </div>;
}
