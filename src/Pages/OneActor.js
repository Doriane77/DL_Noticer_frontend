import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useActorsStore from "../Stores/useActorsStore";
// import "";
export default function OneActor() {
  const { id } = useParams();
  const fetchOneActor = useActorsStore((state) => state.fetchOneActor);
  const currentActor = useActorsStore((state) => state.currentActor);
  console.log("currentActor: ", currentActor);
  useEffect(() => {
    fetchOneActor(id);
  }, [id, fetchOneActor]);

  if (!currentActor) {
    return <p>Chargement...</p>;
  }
  return <div className="OneActor">OneActor </div>;
}
