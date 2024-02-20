// productController.js

const Product = require("./models/ProductModel");
const csvParser = require("csv-parser");
const fs = require("fs");

// Define your product handling functions
async function getProducts(req, res) {
  // Implementation for fetching products
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to fetch products", error: error.message });
  }
}

async function addProduct(req, res) {
  // Implementation for adding a new product
}

async function updateProduct(req, res) {
  // Implementation for updating an existing product
}

async function deleteProduct(req, res) {
  // Implementation for deleting a product
}

// Helper function to determine product type based on CSV row data
function determineProductType(row) {
  const price = parseFloat(row["Variant Price"]);
  const description = row["Body (HTML)"].toLowerCase();
  return price === 25
    ? "zi"
    : price === 20 || description.includes("fashion-fix")
    ? "fashion-fix"
    : "everyday";
}

// Controller method to handle CSV file upload and parsing
async function uploadCSV(req, res) {
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
    .on("error", (err) => {
      res
        .status(500)
        .send({ message: "Error processing CSV", error: err.message });
    });
}

// Export all functions as part of the module.exports object
module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  uploadCSV,
};

// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/productController.js
