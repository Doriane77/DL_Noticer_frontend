import { useState } from "react";
import useAdminStore from "../../Stores/useAdminStore";

export default function LoginForm() {
  const { login, changeOpenForms, failMessage } = useAdminStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
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
