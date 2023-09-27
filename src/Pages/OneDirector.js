import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useDirectorsStore from "../Stores/useDirectorsStore";
//  import "";
export default function OneDirector() {
  const { id } = useParams();
  const fetchOneDiretor = useDirectorsStore((state) => state.fetchOneDiretor);
  const currentDirector = useDirectorsStore((state) => state.currentDirector);
  console.log("currentDirector: ", currentDirector);
  useEffect(() => {
    fetchOneDiretor(id);
  }, [id, fetchOneDiretor]);

  if (!currentDirector) {
    return <p>Chargement...</p>;
  }
  return <div className="oneDirector">oneDirector </div>;
}
