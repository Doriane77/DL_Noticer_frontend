import React from "react";
import "../Sass/Pages/HomePage.scss";

export default function HomePage() {
  return (
    <div className="HomePage">
      <h1>NOTICER</h1>

      <section className="home-welcome">
        <h2>
          Bienvenue sur <span>Noticer</span>
        </h2>
        <p className="subtitle">
          Votre espace de critiques
          <br />
          cinématographiques et littéraires
        </p>
      </section>

      <section className="home-section">
        <h2>Qui sommes-nous ?</h2>
        <p>
          <strong>Noticer</strong> est votre compagnon
          <br />
          idéal dans le vaste univers
          <br />
          du cinéma et de la littérature.
        </p>
      </section>

      <section className="home-section">
        <h2>Que vous offrons-nous ?</h2>
        <p>
          Embarquez dans un voyage
          <br />
          à travers notre riche bibliothèque
          <br />
          de critiques pour enrichir
          <br />
          vos expériences cinématographiques
          <br />
          et littéraires.
        </p>
      </section>

      <section className="home-section">
        <h2>Comment optimiser votre expérience sur Noticer ?</h2>
        <p>
          Le monde de <strong>Noticer</strong> est ouvert
          <br />
          à tous. Lisez les critiques qui
          <br />
          vous intriguent, et pour une
          <br />
          participation active, un simple
          <br />
          enregistrement suffit.
        </p>
      </section>

      <section className="home-section">
        <h2>Prêt pour l'aventure ?</h2>
        <p>
          Rejoignez notre communauté passionnée
          <br />
          dès aujourd'hui et enrichissez votre univers
          <br />
          cinématographique et littéraire.
        </p>
      </section>
    </div>
  );
}
