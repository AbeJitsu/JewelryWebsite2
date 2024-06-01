// server/src/api/routes/cartRoutes.js
const express = require("express");
const cartController = require("@/controllers/cartController");
const { authMiddleware } = require("@/middleware/auth/authMiddleware");
const { ensureCartExists } = require("@/middleware/cartMiddleware");

const router = express.Router();

router.get("/", authMiddleware, ensureCartExists, cartController.getCart);
router.post(
  "/add",
  authMiddleware,
  ensureCartExists,
  cartController.addItemToCart
);
router.post(
  "/update",
  authMiddleware,
  ensureCartExists,
  cartController.updateItemQuantity
);
router.post(
  "/remove",
  authMiddleware,
  ensureCartExists,
  cartController.removeItemFromCart
);
router.post("/sync", authMiddleware, cartController.syncCart);
router.post("/merge", authMiddleware, cartController.mergeCart);

module.exports = router;
