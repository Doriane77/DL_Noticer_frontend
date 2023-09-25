import React from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

import { Movies, Books, HomePage } from "./Pages/indexPages";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/books" element={<Books />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
