const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(
  cors({
    origin: "https://image-fetcher-express-2jhi.vercel.app",
    optionsSuccessStatus: 200,
  })
);

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

app.post("/images", (req, res) => {
  try {
    const { brand, productCode, colorCode } = req.body;
    const urlArray = getUrlArray(brand, productCode, colorCode);

    res.status(200).json(urlArray);
  } catch (error) {
    console.log("Error downloading image: ", error.message);
    res.status(500).json({ error: "Error downloading image" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
