import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [page, setPage] = useState("home");

  return (
    <>
      <nav className="flex flex-row h-24 w-full bg-slate-700 items-center justify-between px-8 ">
        <p className="text-2xl font-bold text-white">
          <Link to="/">Image Fetcher</Link>
        </p>
        <div className="flex items-center text-white">
          <ul className="flex items-cente gap-4 text-xl px-4 py-2">
            <li
              className={` ${
                page === "home" ? "bg-orange-500" : "bg-slate-500"
              }   font-semibold rounded-md hover:scale-105 duration-200`}
            >
              <Link
                className="px-2 py-2"
                onClick={() => setPage("home")}
                to="/"
              >
                Home
              </Link>
            </li>
            <li
              className={`${
                page === "history" ? "bg-orange-500" : "bg-slate-500"
              }  bg-orange-500 font-medium rounded-md hover:scale-105 duration-200`}
            >
              <Link
                className="px-2 py-2"
                onClick={() => setPage("history")}
                to="/history"
              >
                History
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
