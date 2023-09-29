import React, { useState } from "react";
import useUserStore from "../Stores/useUserStore";
import "../Sass/Modals/UserForm.scss";
export default function UserForm() {
  const { user, seeModalForms, openForms } = useUserStore();
  if (!seeModalForms) return null;
  return (
    <div className="UserForm">
      {user ? (
        <>{openForms === "login" && <UpdateForm />}</>
      ) : (
        <>
          {openForms === "login" && <LoginForm />}
          {openForms === "register" && <RegisterForm />}
        </>
      )}
    </div>
  );
}
function UpdateForm() {
  const {
    user,
    updateUser,
    close,
    failMessage,
    changeTextForm,
    changeOpenForms,
  } = useUserStore();

  const [userName, setUserName] = useState(user.username);

  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    changeTextForm();
    updateUser(userName, email, password);
  };
  const handleDeleteAccount = () => {};
  return (
    <form className="UpdateForm" onSubmit={handleSubmit}>
      <h1>Modifier mon compte</h1>
      <button className="X" type="button" onClick={close}>
        X
      </button>
      <input
        type="text"
        aria-label="Votre nom d'utilisateur"
        placeholder="Nom d'utilisateur"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
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
      <button className="deleteAccount">Supprimer le compte</button>
    </form>
  );
}
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser, close, failMessage, changeOpenForms } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginUser(email, password);
  };
  return (
    <form className="LoginForm" onSubmit={handleSubmit}>
      <button className="X" type="button" onClick={close}>
        X
      </button>
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
      <button
        className="changeForm"
        onClick={() => changeOpenForms("register")}
      >
        Pas de compte ? S'enregistrer{" "}
      </button>
    </form>
  );
}
function RegisterForm() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { registerUser, close, failMessage, changeTextForm, changeOpenForms } =
    useUserStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    changeTextForm();
    registerUser(userName, email, password);
  };
  return (
    <form className="RegisterForm" onSubmit={handleSubmit}>
      <button className="X" type="button" onClick={close}>
        X
      </button>
      <h1>Créer un compte</h1>
      <input
        type="text"
        aria-label="Votre nom d'utilisateur"
        placeholder="Nom d'utilisateur"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
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
      <button className="changeForm" onClick={() => changeOpenForms("login")}>
        Déja un compte ? Se connecter
      </button>
    </form>
  );
}
