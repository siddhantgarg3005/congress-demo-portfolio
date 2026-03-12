import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Preloader from "./components/Preloader/Preloader";
import ScrollToTop from "./components/ScrollToTop";
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import ResumeNew from "./components/Resume/ResumeNew";

import CursorTrail from "./components/CursorTrail/CursorTrail";

import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [load, setLoad] = useState(true);

  return (
    <Router>
      <Preloader load={load} onComplete={() => setLoad(false)} />

      <CursorTrail />

      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <NavBar />

        <ScrollToTop />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/journey" element={<About />} />

          <Route path="/vision" element={<Projects />} />

          <Route path="/achievements" element={<ResumeNew />} />

          <Route path="*" element={<Home />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
