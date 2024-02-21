// Import necessary modules
const express = require("express");
const multer = require("multer");
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  uploadCSV,
  buildSearchCriteria, // Assuming you have this function implemented
  // Assuming you'll implement searchProducts or adjust according to your actual function
} = require("../productController");

// Set up multer for file uploads, storing files in the 'uploads/' directory
const upload = multer({ dest: "uploads/" });

// Create a router instance
const router = express.Router();

// Define routes for product operations
router.get("/", getProducts);
router.post("/", upload.none(), addProduct);
router.get("/:id", getProductById); // Corrected to use destructured methods
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

// Define a single route for CSV file and quantities upload
router.post("/upload-csv", upload.single("file"), uploadCSV);

// Advanced search with sorting and pagination
// This assumes you'll adjust the implementation to match your actual functionality
router.get("/search", async (req, res) => {
  const { query, sort = "title", page = 1, pageSize = 10 } = req.query;
  const searchCriteria = buildSearchCriteria(query);
  const skipAmount = (page - 1) * pageSize;

  try {
    // Adjust this part according to your actual searchProducts implementation
    const products = await Product.find(searchCriteria)
      .sort({ [sort]: 1 })
      .skip(skipAmount)
      .limit(pageSize);
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error performing search", error: error.message });
  }
});

// Export the router for use in your server setup
module.exports = router;
