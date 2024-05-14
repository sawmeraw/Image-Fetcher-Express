import React from "react";
import { FaGithub } from "react-icons/fa";

const Repo = () => {
  return (
    <>
      <div className="footer hover:scale-110">
        <a
          href="https://github.com/sawmeraw/Image-Fetcher-Express/tree/main"
          target="_blank"
          className="flex items-center px-2 gap-2 hover:underline"
        >
          <FaGithub />
        </a>{" "}
      </div>
    </>
  );
};

export default Repo;
