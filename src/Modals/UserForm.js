import React, { useState } from "react";
import useUserStore from "../Stores/useUserStore";
import "../Sass/Modals/UserForm.scss";
export default function UserForm() {
  const { seeModalForms } = useUserStore();
  if (!seeModalForms) return null;
  return (
    <div className="UserForm">
      <LoginForm />
    </div>
  );
}
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser, close, failMessage } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginUser(email, password);
  };
  return (
    <form className="LoginForm" onSubmit={handleSubmit}>
      <button className="X" type="button" onClick={close}>
        X
      </button>
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
