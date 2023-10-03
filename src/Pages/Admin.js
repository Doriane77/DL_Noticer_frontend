import React, { useEffect, useState } from "react";
import useAdminStore from "../Stores/useAdminStore";
import "../Sass/Pages/Admin.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddAdmin from "../Contents/Admin/AddAdmin";
import Users from "../Contents/Admin/Users.js";
import LoginForm from "../Contents/Admin/LoginForm";
import AddActor from "../Contents/Admin/AddActor.js";
import AddAuthor from "../Contents/Admin/AddAuthor";
import AddDirector from "../Contents/Admin/AddDirector";
import AddMovie from "../Contents/Admin/AddMovie.js";
export default function Admin() {
  const { admin, openForm, changeOpenForms } = useAdminStore();

  return (
    <div className="Admin">
      {admin === null ? (
        <LoginForm />
      ) : (
        <div className="BoxButtons">
          <button onClick={() => changeOpenForms("AdminBox")}>
            Admin
            <FontAwesomeIcon className="icon" icon="fa-solid fa-user-secret" />
          </button>
          <button onClick={() => changeOpenForms("movieBox")}>
            Films
            <FontAwesomeIcon className="icon" icon="fa-solid fa-film" />
          </button>
          <button onClick={() => changeOpenForms("bookBox")}>
            Livres
            <FontAwesomeIcon className="icon" icon="fa-solid fa-book" />
          </button>
          <button onClick={() => changeOpenForms("directorBox")}>
            Réalisateur
            <FontAwesomeIcon className="icon" icon="fa-solid fa-address-book" />
          </button>
          <button onClick={() => changeOpenForms("authorBox")}>
            Autheur
            <FontAwesomeIcon className="icon" icon="fa-solid fa-feather" />
          </button>
          <button onClick={() => changeOpenForms("usersBox")}>
            Utilisateurs
            <FontAwesomeIcon className="icon" icon="fa-solid fa-users" />
          </button>
          <button onClick={() => changeOpenForms("actorsBox")}>
            Acteurs
            <FontAwesomeIcon className="icon" icon="fa-solid fa-star" />
          </button>
        </div>
      )}

      {admin && (
        <>
          {openForm === "AdminBox" && <AddAdmin />}
          {openForm === "movieBox" && <AddMovie />}
          {openForm === "bookBox" && <AddBook />}
          {openForm === "directorBox" && <AddDirector />}
          {openForm === "authorBox" && <AddAuthor />}
          {openForm === "actorsBox" && <AddActor />}
          {openForm === "usersBox" && <Users />}
        </>
      )}
    </div>
  );
}

function AddBook() {
  return (
    <div className="Box">
      <h1>Livre</h1>
    </div>
  );
}
