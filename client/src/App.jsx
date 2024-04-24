import React from "react";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer position="top-right" />
      <Navbar />
      <Search />
    </>
  );
}

export default App;
