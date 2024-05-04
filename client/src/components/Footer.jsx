import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="bg-slate-700 h-16 flex flex-col items-center justify-center text-white">
        <p className="text-sm">© 2024 img express</p>
        <p className="text-sm flex hover:scale-110 duration-200">
          Repo:{" "}
          <a
            href="https://github.com/sawmeraw/Image-Fetcher-Express/tree/main"
            target="_blank"
            className="flex items-center px-2 gap-2 hover:underline"
          >
            Github
            <FaExternalLinkAlt />
          </a>{" "}
        </p>
      </footer>
    </>
  );
};

export default Footer;
