import React, { useState } from "react";
import fetchData from "./customInstance";
import { nanoid } from "nanoid";

const Search = () => {
  const [images, setImages] = useState([]);

  const labelClasses = "text-xl text-slate-700 font-medium mb-2";

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      productCode: formData.get("product-code"),
      colorCode: formData.get("color-code"),
    };

    const fetchImages = async () => {
      try {
        const response = await fetchData.post("/asics", data, {
          responseType: "arraybuffer",
        });

        const blob = new Blob([response.data], { type: "image/jpeg" });
        const url = URL.createObjectURL(blob);

        setImages([url]);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchImages();
  };

  const handleDownloadClick = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = images[0];
    downloadLink.download = "image.jpg";
    downloadLink.click();
  };

  return (
    <>
      <div className="px-16 py-14 ">
        <p className="text-center font-semibold text-2xl mb-8">
          Current implementation of this app only allows Asics product images to
          be fetched.
        </p>
        <form
          action=""
          onSubmit={handleFormSubmit}
          className="w-[700px] h-auto px-4 py-4 mx-auto"
        >
          <div className="flex flex-row gap-4 items-center py-4 justify-center">
            <label htmlFor="product-code" className={labelClasses}>
              Product Code
            </label>
            <input
              type="text"
              name="product-code"
              id="product-code"
              className="rounded-md border-cyan-500 border-2 focus:outline-none px-2 w-1/4 font-sm"
            />
          </div>
          <div className="flex flex-row gap-4 items-center py-4 justify-center">
            <label htmlFor="color-code" className={labelClasses}>
              Color Code
            </label>
            <input
              type="text"
              name="color-code"
              id="color-code"
              className="rounded-md border-cyan-500 border-2 focus:outline-none px-2 w-1/4 font-sm"
            />
          </div>
          <div className="py-4 flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-400 rounded-md text-white font-semibold hover:scale-110 duration-300 hover:text-black "
            >
              Fetch
            </button>
          </div>
        </form>
        <div className="mt-4 px-4 py-4 flex items-center justify-center">
          {images?.map((image) => {
            const id = nanoid();
            return (
              <>
                <div key={id} className="flex flex-col gap-4 items-center">
                  <img
                    src={image}
                    alt="Asics product"
                    className="w-[200px] h-auto mx-auto"
                  />
                  <button
                    onClick={handleDownloadClick}
                    className="px-4 py-2 bg-cyan-400 rounded-md w-1/2 hover:scale-110 duration-300 text-white font-semibold"
                  >
                    Download
                  </button>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Search;
