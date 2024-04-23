const express = require("express");
const axios = require("axios");
const cors = require("cors");
const http = require("http");
const https = require("https");

const app = express();

app.use(cors());

const PORT = 5000;

app.use(express.json());

app.post("/api/asics", async (req, res) => {
  try {
    const { productCode, colorCode } = req.body;
    const imageURL = encodeURI(
      `https://images.asics.com/is/image/asics/${productCode}_${colorCode}_SR_RT_GLB?$zoom$`
    );

    const protocol = imageURL.startsWith("https") ? https : http;

    protocol
      .get(imageURL, (response) => {
        let imageData = Buffer.from([]);
        response.on("data", (chunk) => {
          imageData = Buffer.concat([imageData, chunk]);
        });
        response.on("end", () => {
          res.setHeader("Content-Type", "image/jpeg");
          res.send(imageData);
        });
      })
      .on("error", (error) => {
        console.error("Error downloading image: ", error.message);
        res.status(500).json({ error: "Error downloading image" });
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Error downloading image" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
