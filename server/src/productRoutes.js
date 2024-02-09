// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/productRoutes.js
const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProducts,
  updateProduct, // Make sure to define this in your productController
  deleteProduct, // Make sure to define this in your productController
} = require("./productController");

// Fetch all products
router.get("/", getProducts);

// Add a new product
router.post("/", addProduct);

// Update an existing product by ID
router.put("/:id", updateProduct);

// Delete a product by ID
router.delete("/:id", deleteProduct);

module.exports = router;
