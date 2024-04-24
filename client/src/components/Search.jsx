import React, { useState } from "react";
import fetchData from "./customInstance";
import { nanoid } from "nanoid";
import JSZip from "jszip";
import { toast } from "react-toastify";

const Search = () => {
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError(false);
    const formData = new FormData(e.target);
    const productCode = formData.get("product-code");
    const colorCode = formData.get("color-code");
    const data = {
      brand: formData.get("brand"),
      productCode: productCode.trim(),
      colorCode: colorCode.trim(),
    };
    const fetchImages = async () => {
      try {
        const response = await fetchData.post("/images", data);
        if (!response.ok) {
          toast.error("Error fetching image", { autoClose: 1500 });
          return;
        }

        toast.success("Images fetched successfully", { autoClose: 1500 });
        setImages(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchImages();
  };

  const handleError = () => {
    setImages([]);
    setError(true);
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
        toast.success("Images downloaded successfully", { autoClose: 1500 });
        URL.revokeObjectURL(link.href);
      })
      .catch((error) => {
        console.log(error.message);
        toast.error("Error creating zip file", { autoClose: 1500 });
      });
  };

  return (
    <>
      <div className="px-16 py-14">
        <p className="text-center font-semibold text-2xl mb-8">
          Brands Supported: Asics, Saucony
        </p>
        <form
          action=""
          onSubmit={handleFormSubmit}
          className="w-[700px] h-auto px-4 py-4 mx-auto"
        >
          <div className="flex flex-col gap-4 items-center py-4 justify-center">
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
            </select>
            {selected && (
              <p className="bg-yellow-300 border-yellow-700 border-2 px-2 py-2">
                {selected === "asics"
                  ? "Eg. For Asics, use product code: 1011B548 and color code: 001"
                  : "Eg. For Saucony, use product code: S20939 and color code: 129"}
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
        <div className="mt-4 px-4 py-4 flex flex-row gap-4 items-center justify-center">
          {images?.map((image, index) => {
            const id = index;
            return (
              <>
                <img
                  key={id}
                  src={image}
                  alt="product image"
                  className="w-[200px] h-auto mx-auto shadow-lg rounded-md"
                  onError={handleError}
                />
              </>
            );
          })}
        </div>
        <div className="flex w-full items-center justify-center mt-4">
          {images.length > 0 && (
            <button
              onClick={handleDownloadAllClick}
              className="px-4 py-2 bg-cyan-400 rounded-md hover:scale-110 duration-300 text-white font-semibold hover:text-black"
            >
              Download All
            </button>
          )}
        </div>
        <div className="flex w-full items-center justify-center mt-4">
          {error && <p>No images found. Check the URL.</p>}
        </div>
      </div>
    </>
  );
};

export default Search;
