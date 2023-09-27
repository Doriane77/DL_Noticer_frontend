import React, { useEffect } from "react";
import useHeaderStore from "../Stores/Header";
import useActorsStore from "../Stores/useActorsStore";
import InSearch from "../Components/InSearch";
import ImgBox from "../Components/ImgBox";
import "../Sass/Pages/Actors.scss";
import Sections from "../Components/Sections";
export default function Actors() {
  const actors = useActorsStore((s) => s.actors);
  const searchActor = useActorsStore((s) => s.searchActor);
  const fetchAllActors = useActorsStore((s) => s.fetchAllActors);
  const fetchActorsByTitle = useActorsStore((s) => s.fetchActorsByTitle);
  const close = useHeaderStore((s) => s.close);

  useEffect(() => {
    close();
    fetchAllActors();
  }, [close, fetchAllActors]);
  useEffect(() => {
    fetchActorsByTitle();
  }, [searchActor]);
  return (
    <div className="Actors">
      <InSearch props={{ page: "Actors", placeholder: "Rechercher" }} />
      <Sections props={{ page: "Actors", data: actors }} />
    </div>
  );
}
