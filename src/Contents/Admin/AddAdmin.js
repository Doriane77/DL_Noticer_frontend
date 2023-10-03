import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAdminStore from "../../Stores/useAdminStore";

export default function AddAdmin() {
  const { register, allAdmin, all, StatusMessage, failMessage } =
    useAdminStore();
  const [seeBlock, setBlock] = useState("form");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    register(email, username, password);
  }
  useEffect(() => {
    if (seeBlock === "liste") {
      all();
    }
  }, [seeBlock, all]);
  return (
    <div className="Box">
      <h1>Administration</h1>
      <div className="buttons">
        <button onClick={() => setBlock("liste")}>listes</button>
        <button onClick={() => setBlock("form")}>+ admin</button>
      </div>

      {seeBlock === "form" && (
        <form>
          <h2>Créer un administrateur</h2>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="error">{failMessage}</p>
          <p>{StatusMessage}</p>
          <button className="submit" onClick={handleSubmit}>
            Créer
          </button>
        </form>
      )}
      {seeBlock === "liste" && (
        <table className="Liste">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {allAdmin &&
              allAdmin.map((item, index) => (
                <tr key={index}>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
