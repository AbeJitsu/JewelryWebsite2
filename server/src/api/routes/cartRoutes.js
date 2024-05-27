// server/src/api/routes/cartRoutes.js

const express = require("express");
const cartController = require("../controllers/cartController");
const { authMiddleware } = require("../middleware/auth/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, cartController.getCart);
router.post("/add", authMiddleware, cartController.addItemToCart);
router.post("/update", authMiddleware, cartController.updateItemQuantity);
router.delete(
  "/remove/:productId",
  authMiddleware,
  cartController.removeItemFromCart
); // Corrected line
router.post("/sync", authMiddleware, cartController.syncCart);
router.post("/merge", authMiddleware, cartController.mergeCart);

module.exports = router;
