// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/routes/cartRoutes.js

const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// Retrieve cart by session token or user ID
router.get("/", cartController.getCart);

// Add item to cart or update existing cart
router.post("/add", cartController.addItemToCart);

// Update quantity of an item in the cart
router.post("/update", cartController.updateItemQuantity);

// Remove item from cart
router.delete("/remove/:productId", cartController.removeItemFromCart);

module.exports = router;
