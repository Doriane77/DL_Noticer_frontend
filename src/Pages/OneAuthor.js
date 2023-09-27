import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAuthorsStore from "../Stores/useAuthorsStore";
//  import "";
export default function OneAuthor() {
  const { id } = useParams();
  const fetchOneAuthor = useAuthorsStore((state) => state.fetchOneAuthor);
  const currentAuthor = useAuthorsStore((state) => state.currentAuthor);
  console.log("currentAuthor: ", currentAuthor);
  useEffect(() => {
    fetchOneAuthor(id);
  }, [id, fetchOneAuthor]);

  if (!currentAuthor) {
    return <p>Chargement...</p>;
  }
  return <div className="OneAuthor">OneAuthor </div>;
}
