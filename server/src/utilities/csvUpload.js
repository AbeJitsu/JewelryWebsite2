// /Users/abiezerreyes/Documents/JewelryWebsite2/server/src/utilities/csvUpload.js

const csvParser = require("csv-parser");
const fs = require("fs");
const Product = require("@/api/models/productModel");
const { determineProductType } = require("@/utilities/csvUtils.js");

function handleCSVUpload(req, res) {
  if (!req.file) {
    return res.status(400).send({ message: "No CSV file uploaded." });
  }

  const filePath = req.file.path;
  const productsByHandle = {};

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on("data", (row) => {
      const handle = row["Handle"];
      if (handle) {
        productsByHandle[handle] = { ...row, type: determineProductType(row) };
      }
    })
    .on("end", async () => {
      try {
        const updatePromises = Object.values(productsByHandle).map(
          (productData) =>
            Product.findOneAndUpdate(
              { handle: productData.Handle },
              productData,
              { upsert: true, new: true }
            )
        );
        await Promise.all(updatePromises);
        res.json({ message: "CSV processed successfully." });
      } catch (error) {
        res
          .status(500)
          .send({ message: "Error processing products", error: error.message });
      }
    })
    .on("error", (error) => {
      res
        .status(500)
        .send({ message: "Error processing CSV", error: error.message });
    });
}

module.exports = {
  handleCSVUpload,
};
