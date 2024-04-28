const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    productCode: {
      type: String,
      required: true,
    },
    colorCode: {
      type: String,
      required: true,
    },
    urlArray: {
      type: [String],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "products" }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
