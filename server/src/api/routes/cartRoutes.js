// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/api/routes/cartRoutes.js

const express = require("express");
const cartController = require("../controllers/cartController");
const { authMiddleware } = require("../middleware/auth/authMiddleware");
const router = express.Router();

// Retrieve cart by session token or user ID
router.get("/", authMiddleware, cartController.getCart);
router.post("/add", authMiddleware, cartController.addItemToCart);
router.post("/update", authMiddleware, cartController.updateItemQuantity);
router.delete(
  "/remove/:productId",
  authMiddleware,
  cartController.removeItemFromCart
);
router.post("/sync", authMiddleware, cartController.syncCart);

module.exports = router;
