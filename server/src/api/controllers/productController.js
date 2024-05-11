// /Users/abiezerreyes/Documents/JewelryWebsite2/server/src/api/controllers/productController.js

const Product = require("../models/ProductModel");
const csvParser = require("csv-parser");
const fs = require("fs");

// Keyword arrays
const color_keywords = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "pink",
  "black",
  "white",
  "gold",
  "silver",
  "multi",
  "turquoise",
  "opal",
  "amber",
  "marbled",
  "teal",
  "coral",
  "navy",
  "lavender",
  "peach",
  "mint",
  "rose gold",
  "charcoal",
  "ivory",
  "bronze",
  "pastel",
  "neon",
  "metallic",
  "aquamarine",
  "garnet",
  "citrine",
  "peridot",
  "magenta",
  "olive",
  "mauve",
  "tan",
  "indigo",
  "violet",
  "fuchsia",
  "champagne",
  "sapphire",
  "ruby",
  "emerald",
  "topaz",
  "onyx",
  "pearl",
  "gunmetal",
  "platinum",
  "burgundy",
  "lime",
  "chocolate",
]; // Fill in your color keywords
const material_keywords = [
  "bead",
  "metal",
  "glass",
  "crystal",
  "wood",
  "leather",
  "stone",
  "plastic",
  "fabric",
  "rhinestone",
  "sequin",
  "enamel",
  "lace",
  "mesh",
  "faux fur",
  "velvet",
]; // Fill in your material keywords
const looks_keywords = [
  "pearl",
  "oil spill",
  "iridescent",
  "pearlescent",
  "glittered",
  "foil",
]; // Fill in your looks keywords
const style_keywords = [
  "mermaid",
  "fringe",
  "tassel",
  "heart",
  "butterfly",
  "mandala",
  "shell",
  "crackle",
  "lightweight",
  "sapphire",
  "ruby",
  "emerald",
  "marquise",
  "hoop",
  "jacket",
  "cuff",
  "bangle",
  "stretch",
  "coil",
  "metallic",
  "crawler",
];

// Extract keywords from product descriptions
function extractKeywordsFromDescription(description) {
  let colors = color_keywords.filter((keyword) =>
    description.toLowerCase().includes(keyword)
  );
  let materials = material_keywords.filter((keyword) =>
    description.toLowerCase().includes(keyword)
  );
  let looks = looks_keywords.filter((keyword) =>
    description.toLowerCase().includes(keyword)
  );
  let styles = style_keywords.filter((keyword) =>
    description.toLowerCase().includes(keyword)
  );
  return { colors, materials, looks, styles };
}

// Get all products
async function getProducts(req, res) {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to fetch products", error: error.message });
  }
}

// Add a new product
async function addProduct(req, res) {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res
      .status(201)
      .send({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to add product", error: error.message });
  }
}

// Update an existing product
async function updateProduct(req, res) {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to update product", error: error.message });
  }
}

// Delete a product
async function deleteProduct(req, res) {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to delete product", error: error.message });
  }
}

// Fetch a single product by its ID
async function getProductById(req, res) {
  // Log the ID received from the client
  console.log("Fetching product with ID:", req.params.id);

  try {
    // Fetch the product from the database using the ID
    const product = await Product.findById(req.params.id);

    // Check if product exists
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Send the product data as a response
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch product", error: error.message });
  }
}

// Handle CSV file upload and parsing
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
    .on("error", (error) => {
      res
        .status(500)
        .send({ message: "Error processing CSV", error: error.message });
    });
}

// Determine product type based on CSV row
function determineProductType(row) {
  const price = parseFloat(row["Variant Price"]);
  const description = row["Body (HTML)"].toLowerCase();
  if (price == 25) return "zi";
  if (price == 20 || description.includes("fashion-fix")) return "fashion-fix";
  return "everyday";
}

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  uploadCSV,
  extractKeywordsFromDescription, // If you need to expose this for external use
};
