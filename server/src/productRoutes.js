// Import necessary modules
const express = require("express");
const multer = require("multer");
const productController = require("./productController");

// Set up multer for file uploads, storing files in the 'uploads/' directory
const upload = multer({ dest: "uploads/" });

// Create a router instance
const router = express.Router();

// Define routes for product operations
router.get("/products", productController.getProducts);
router.post("/products", upload.none(), productController.addProduct);
router.put("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);

// Define a single route for CSV file and quantities upload
router.post("/upload-csv", upload.single("file"), productController.uploadCSV);

// Export the router for use in your server setup
module.exports = router;

// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/productRoutes.js
