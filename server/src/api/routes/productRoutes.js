// /Users/abiezerreyes/Documents/JewelryWebsite2/server/src/api/routes/productRoutes.js

const express = require("express");
const multer = require("multer");
const productController = require("../controllers/productController");
const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.get("/", productController.getProducts);
router.post("/", upload.none(), productController.addProduct);
router.get("/:id", productController.getProductById);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
router.post("/upload-csv", upload.single("file"), productController.uploadCSV);

module.exports = router;
