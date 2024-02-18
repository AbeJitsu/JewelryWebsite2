const Product = require("./models/ProductModel");
const csvParser = require("csv-parser");
const fs = require("fs");

function determineProductType(row) {
  const price = parseFloat(row["Variant Price"]);
  const description = row["Body (HTML)"].toLowerCase();
  if (price === 25) return "zi";
  else if (price === 20 || description.includes("fashion-fix"))
    return "fashion-fix";
  return "everyday";
}

exports.uploadCSV = async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: "No CSV file uploaded." });
  }

  const file = req.file.path;
  let productsByHandle = {};

  fs.createReadStream(file)
    .pipe(csvParser())
    .on("data", (row) => {
      const handle = row["Handle"];
      if (handle) {
        if (!productsByHandle[handle]) {
          productsByHandle[handle] = {
            ...row,
            type: determineProductType(row),
          };
        }
      }
    })
    .on("end", async () => {
      try {
        for (const handle in productsByHandle) {
          const productData = productsByHandle[handle];
          await Product.findOneAndUpdate({ handle }, productData, {
            upsert: true,
            new: true,
          });
        }
        console.log("All products updated/inserted successfully.");
        res.json({ message: "CSV processed successfully." });
      } catch (error) {
        console.error("Error during database update/insert:", error);
        res
          .status(500)
          .send({ message: "Error processing products", error: error.message });
      }
    })
    .on("error", (err) => {
      res
        .status(500)
        .send({ message: "Error processing CSV", error: err.message });
    });
};

module.exports = exports;

// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/productController.js
