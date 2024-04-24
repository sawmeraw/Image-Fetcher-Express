const express = require("express");
const axios = require("axios");
const cors = require("cors");
const http = require("http");
const https = require("https");

const app = express();

const corsOptions = {
  origin: "https://image-fetcher-express-2jhi.vercel.app/",
  methods: "POST",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const PORT = 5000;

app.use(express.json());

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
  }
};

app.post("/api", async (req, res) => {
  try {
    const { brand, productCode, colorCode } = req.body;
    const urlArray = getUrlArray(brand, productCode, colorCode);
    res.json(urlArray);
  } catch (error) {
    console.log("Error downloading image: ", error.message);
    res.status(500).json({ error: "Error downloading image" });
  }
});

//This was a learning exercise to deal with arraybuffer and blob
// app.post("/api", async (req, res) => {
//   try {
//     const { brand, productCode, colorCode } = req.body;
//     const urlArray = getUrlArray(brand, productCode, colorCode);
//     const imageArray = await Promise.all(
//       urlArray.map(async (url, index) => {
//         const response = await axios.get(url);
//         const blob = new Blob([response.data], { type: "image/jpeg" });
//         const imageUrl = URL.createObjectURL(blob);
//         return {
//           index,
//           imageUrl,
//         };
//       })
//     );
//     res.json(imageArray);
//   } catch (error) {
//     console.log("Error downloading image: ", error.message);
//     res.status(500).json({ error: "Error downloading image" });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
