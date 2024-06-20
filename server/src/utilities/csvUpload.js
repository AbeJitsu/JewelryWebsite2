// /Users/abiezerreyes/Documents/JewelryWebsite2/server/src/utilities/csvUpload.js

const csvParser = require("csv-parser");
const fs = require("fs");
const Product = require("@/api/models/productModel");
const { determineProductType } = require("@/utilities/csvUtils.js");

async function handleCSVUpload(req, res) {
  if (!req.files || !req.files.regular || !req.files.premiere) {
    return res.status(400).send({ message: "Both CSV files are required." });
  }

  const regularCSV = req.files.regular[0];
  const premiereCSV = req.files.premiere[0];

  try {
    const regularData = await parseCSVFile(regularCSV.path);
    const premiereData = await parseCSVFile(premiereCSV.path);

    const combinedData = mergeData(regularData, premiereData);

    const updatePromises = combinedData.map((productData) => {
      const { handle, quantity } = productData;
      return Product.findOneAndUpdate(
        { handle },
        { $set: { quantity, type: determineProductType(productData) } },
        { new: true, upsert: true }
      );
    });

    await Promise.all(updatePromises);

    res.json({ message: "CSV files processed successfully." });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error processing CSV files", error: error.message });
  }
}

function parseCSVFile(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
}

function mergeData(regularData, premiereData) {
  const premiereMap = new Map();
  premiereData.forEach((item) => {
    premiereMap.set(item.sku, item.quantity);
  });

  return regularData.map((item) => {
    const quantity = premiereMap.get(item["Variant SKU"]) || 0;
    return { ...item, quantity };
  });
}

module.exports = { handleCSVUpload };
