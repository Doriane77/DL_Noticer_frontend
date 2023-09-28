import React from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fontAwesomeIcons } from "./Assets/fontAwesomeIcon";

import Header from "./Header";
import Footer from "./Footer";

import {
  Movies,
  Books,
  HomePage,
  Director,
  Authors,
  Actors,
  OneActor,
  OneAuthor,
  OneDirector,
  OneBook,
  OneMovie,
} from "./Pages/indexPages";

import UserForm from "./Modals/UserForm";

library.add(fontAwesomeIcons);
function App() {
  return (
    <Router>
      <Header />
      <UserForm />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/books" element={<Books />} />
        <Route path="/director" element={<Director />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/actors" element={<Actors />} />
        <Route path="/actor/detail/:id" element={<OneActor />} />
        <Route path="/author/detail/:id" element={<OneAuthor />} />
        <Route path="/director/detail/:id" element={<OneDirector />} />
        <Route path="/book/detail/:id" element={<OneBook />} />
        <Route path="/movie/detail/:id" element={<OneMovie />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
