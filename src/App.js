import React from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

import {
  Movies,
  Books,
  HomePage,
  Director,
  Authors,
  Actors,
} from "./Pages/indexPages";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/books" element={<Books />} />
        <Route path="/director" element={<Director />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/actors" element={<Actors />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
