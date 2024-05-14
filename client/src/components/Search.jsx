import React, { useState } from "react";
import fetchData from "./customInstance";
import { nanoid } from "nanoid";
import JSZip from "jszip";
import { toast } from "react-toastify";

const Search = () => {
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState();
  const [erroredImages, setErroredImages] = useState(new Set());

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErroredImages(new Set());
    const formData = new FormData(e.target);
    const productCode = formData.get("product-code");
    const colorCode = formData.get("color-code");
    const data = {
      brand: selected,
      productCode: productCode.trim(),
      colorCode: colorCode.trim(),
    };
    const fetchImages = async () => {
      try {
        const response = await fetchData.post("/images", data);
        setImages(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchImages();
  };

  const handleError = (index) => {
    setErroredImages((prev) => new Set([...prev, index]));
    toast.warn(`Some issue with image-${index + 1}`, { autoClose: 750 });
  };

  const handleDownloadAllClick = async () => {
    const zip = new JSZip();
    const imagePromises = images.map(async (image, index) => {
      const response = await fetch(image);
      const blob = await response.blob();
      zip.file(`image-${index}.jpeg`, blob);
    });

    await Promise.all(imagePromises);
    zip
      .generateAsync({ type: "blob" })
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `images-${nanoid()}.zip`;
        link.click();
        toast.success("Images downloaded successfully", { autoClose: 750 });
        URL.revokeObjectURL(link.href);
      })
      .catch((error) => {
        console.log(error.message);
        toast.error("Error creating zip file", { autoClose: 750 });
      });
  };

  return (
    <>
      <div
        className={`px-16 py-14 main-page ${
          images.length > 0 && "flex flex-col"
        }`}
      >
        <form
          action=""
          onSubmit={handleFormSubmit}
          className="w-[700px] h-auto px-4 py-4 mx-auto shadow-lg rounded-md"
        >
          <p className="text-center font-semibold text-xl mb-8">
            Brands Supported: Asics, Saucony, New Balance
          </p>
          <div className="flex flex-col gap-4 items-center py-4 justify-center ">
            <select
              name="brand"
              id="brand"
              className="py-2 border-cyan-500 border-2 rounded-md block"
              onChange={(e) => setSelected(e.target.value)}
              required
            >
              <option value="">Select Brand</option>
              <option value="asics">Asics</option>
              <option value="saucony">Saucony</option>
              <option value="newbalance">New Balance</option>
            </select>
            {selected && (
              <p className="bg-yellow-100 text-sm rounded-md border-yellow-700 border-2 px-2 py-2">
                {selected === "asics"
                  ? "Example: product code: 1011B548 and color code: 001"
                  : selected == "saucony"
                  ? "Example: product code: S20939 and color code: 129"
                  : "Example: product code: M1080P13 and color code doesnt matter"}
              </p>
            )}
          </div>
          <div className="flex flex-row gap-4 items-center py-4 justify-center">
            <input
              placeholder="product code"
              type="text"
              name="product-code"
              id="product-code"
              required
              className="rounded-md border-cyan-500 border-2 focus:outline-none px-2 w-1/4 font-sm"
            />
          </div>
          <div className="flex flex-row gap-4 items-center py-4 justify-center">
            <input
              placeholder="color code"
              type="text"
              name="color-code"
              id="color-code"
              required
              className={`rounded-md border-cyan-500 border-2 focus:outline-none px-2 w-1/4 font-sm`}
            />
          </div>
          <div className="py-4 flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-400 rounded-md text-white font-semibold duration-300 hover:bg-cyan-300 "
            >
              Fetch
            </button>
          </div>
        </form>
        <div className="mt-8 px-4 py-4 flex flex-row flex-wrap gap-4 items-center justify-center">
          {images?.map((image, index) => {
            const id = index;
            if (erroredImages.has(index)) {
              return null;
            }
            return (
              <>
                <img
                  key={id}
                  src={image}
                  alt="product image"
                  className="w-[200px] h-auto mx-auto shadow-lg rounded-md"
                  onError={() => handleError(index)}
                />
              </>
            );
          })}
        </div>
        <div className="flex w-full items-center justify-center mt-4">
          {images.length > 0 && (
            <button
              onClick={handleDownloadAllClick}
              className={`px-4 py-2 bg-cyan-400 ${
                erroredImages.size == images.length ? "hidden" : "block"
              } rounded-md duration-300 text-white font-semibold hover:bg-cyan-300`}
            >
              Download All
            </button>
          )}
        </div>

        <div className="flex w-full items-center justify-center mt-4 mb-8">
          {erroredImages.size == images.length && erroredImages.size != 0 && (
            <p>No images found. Check the URL.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
