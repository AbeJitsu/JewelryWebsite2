// /Users/abiezerreyes/Documents/JewelryWebsite2/server/src/api/controllers/productController.js

const Product = require("../models/ProductModel");
const {
  extractKeywordsFromDescription,
} = require("../utilities/keywordExtraction");
const { handleCSVUpload } = require("../utilities/csvUpload");

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
    const keywords = extractKeywordsFromDescription(req.body.description);
    const newProduct = new Product({ ...req.body, ...keywords });
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
    const keywords = extractKeywordsFromDescription(req.body.description);
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, ...keywords },
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
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch product", error: error.message });
  }
}

// Upload CSV and process it
async function uploadCSV(req, res) {
  return handleCSVUpload(req, res);
}

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  uploadCSV,
};
