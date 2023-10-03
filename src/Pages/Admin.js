import React, { useEffect, useState } from "react";
import useAdminStore from "../Stores/useAdminStore";
import "../Sass/Pages/Admin.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddAdmin from "../Contents/Admin/AddAdmin";
import Users from "../Contents/Admin/Users.js";
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
function AddActor() {
  return (
    <div className="Box">
      <h1>Acteur</h1>
    </div>
  );
}
function AddAuthor() {
  return (
    <div className="Box">
      <h1>Autheur</h1>
    </div>
  );
}
function AddDirector() {
  return (
    <div className="Box">
      <h1>Réalisateur</h1>
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
function AddMovie() {
  return (
    <div className="Box">
      <h1>Film</h1>
    </div>
  );
}

// function Users() {
//   return (
//     <div className="Box">
//       <h1>Utilisateurs</h1>
//     </div>
//   );
// }
function LoginForm() {
  const { login, changeOpenForms, failMessage } = useAdminStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    // changeTextForm();
    login(email, password);
  };
  return (
    <form className="LoginForm" onSubmit={handleSubmit}>
      <h1>Se Connecter</h1>
      <input
        type="email"
        aria-label="Votre adresse email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        aria-label="Votre mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p className="error">{failMessage}</p>
      <button className="submit" type="submit">
        Se connecter
      </button>
    </form>
  );
}
