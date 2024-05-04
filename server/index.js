const Product = require("./models/Product.js");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

// app.use(
//   cors({
//     origin: "https://image-fetcher-express-2jhi.vercel.app",
//   })
// );

app.use(cors());

mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: ", err.message);
  });

const getUrlArray = (brand, productCode, colorCode) => {
  if (brand == "asics") {
    const urlArray = [
      `https://images.asics.com/is/image/asics/${productCode}_${colorCode}_SR_RT_GLB?$zoom$`,
      `https://images.asics.com/is/image/asics/${productCode}_${colorCode}_SR_LT_GLB?$zoom$`,
      `https://images.asics.com/is/image/asics/${productCode}_${colorCode}_SB_TP_GLB?$zoom$`,
      `https://images.asics.com/is/image/asics/${productCode}_${colorCode}_SB_BT_GLB?$zoom$`,
      `https://images.asics.com/is/image/asics/${productCode}_${colorCode}_SB_BK_GLB?$zoom$`,
      `https://images.asics.com/is/image/asics/${productCode}_${colorCode}_SB_FR_GLB?$zoom$`,
    ];
    return urlArray;
  } else if (brand == "saucony") {
    const urlArray = [
      `https://s7d4.scene7.com/is/image/WolverineWorldWide/${productCode}-${colorCode}_1?$dw-hi-res$`,
      `https://s7d4.scene7.com/is/image/WolverineWorldWide/${productCode}-${colorCode}_2?$dw-hi-res$`,
      `https://s7d4.scene7.com/is/image/WolverineWorldWide/${productCode}-${colorCode}_3?$dw-hi-res$`,
      `https://s7d4.scene7.com/is/image/WolverineWorldWide/${productCode}-${colorCode}_4?$dw-hi-res$`,
      `https://s7d4.scene7.com/is/image/WolverineWorldWide/${productCode}-${colorCode}_5?$dw-hi-res$`,
      `https://s7d4.scene7.com/is/image/WolverineWorldWide/${productCode}-${colorCode}_6?$dw-hi-res$`,
    ];
    return urlArray;
  } else if (brand == "newbalance") {
    const urlArray = [
      `https://nb.scene7.com/is/image/NB/${productCode}_nb_02_i?$dw_pdp_hero$`,
      `https://nb.scene7.com/is/image/NB/${productCode}_nb_03_i?$dw_pdp_hero$`,
      `https://nb.scene7.com/is/image/NB/${productCode}_nb_04_i?$dw_pdp_hero$`,
      `https://nb.scene7.com/is/image/NB/${productCode}_nb_05_i?$dw_pdp_hero$`,
      `https://nb.scene7.com/is/image/NB/${productCode}_nb_06_i?$dw_pdp_hero$`,
      `https://nb.scene7.com/is/image/NB/${productCode}_nb_07_i?$dw_pdp_hero$`,
    ];
    return urlArray;
  }
};

app.post("/history", async (req, res) => {
  try {
    const { productCode, colorCode } = req.body;
    await Product.deleteOne({
      productCode: productCode,
      colorCode: colorCode,
    });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error deleting product: ", error.message);
    res.status(500).json({ error: "Error deleting product" });
  }
});

app.post("/images", async (req, res) => {
  try {
    const { brand, productCode, colorCode } = req.body;

    const urlArray = getUrlArray(brand, productCode, colorCode);
    const exists = await Product.findOne({ productCode, colorCode });
    if (exists) {
      res.status(200).json(exists.urlArray);
    } else {
      const newProduct = new Product({
        brand,
        productCode,
        colorCode,
        urlArray,
      });
      await newProduct.save();

      res.status(200).json(urlArray);
    }
  } catch (error) {
    console.log("Error downloading image: ", error.message);
    res.status(500).json({ error: "Error downloading image" });
  }
});

app.get("/history", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.log("Error fetching history: ", error.message);
    res.status(500).json({ error: "Error fetching history" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
