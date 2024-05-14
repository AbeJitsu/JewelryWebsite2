// /Users/abiezerreyes/Documents/JewelryWebsite2/server/src/api/routes/cartRoutes.js

const express = require("express");
const cartController = require("../controllers/cartController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

// Retrieve cart by session token or user ID
router.get("/", authMiddleware, cartController.getCart);
router.post("/add", cartController.addItemToCart);
router.post("/update", cartController.updateItemQuantity);
router.delete("/remove/:productId", cartController.removeItemFromCart);

module.exports = router;


