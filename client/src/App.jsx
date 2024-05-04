import React from "react";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Footer from "./components/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import History from "./components/History";

function App() {
  return (
    <>
      <Router>
        <ToastContainer position="top-right" />
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Search />} />
          <Route path="/history" element={<History />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
