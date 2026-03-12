import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Preloader from "./components/Preloader/Preloader";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Home2 from "./components/Home/Home2";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer/Footer";
import ResumeNew from "./components/Resume/ResumeNew";
import CursorTrail from "./components/CursorTrail/CursorTrail";
import "./style.css";

function App() {
  const [load, setLoad] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoad(false), 3200);
    return () => clearTimeout(t);
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      {!load && (
        <>
          <CursorTrail />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/journey" element={<Home2 />} />
            <Route path="/vision" element={<Projects />} />
            <Route path="/achievements" element={<ResumeNew />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </>
      )}
    </Router>
  );
}

export default App;
