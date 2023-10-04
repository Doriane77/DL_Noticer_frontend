import React, { useEffect, useState } from "react";
import "../Sass/Components/AdminButton.scss";
import useAuthorsStore from "../Stores/useAuthorsStore";
import useBooksStore from "../Stores/useBooksStore";
import FormGenerator from "./FormGenerator";
import Liste from "./Liste";
export default function AdminButton({ id }) {
  const { supprimer } = useAuthorsStore();

  return (
    <div className="AdminButton">
      <button className="sup" onClick={() => supprimer(id)}>
        Supprimer
      </button>
    </div>
  );
}
