const express = require("express");
const cartController = require("../controllers/cartController");
const authMiddleware = require("../middleware/auth/authMiddleware");
const cartMiddleware = require("../middleware/cartMiddleware");
const router = express.Router();

router.get("/", authMiddleware.authMiddleware, cartController.getCart);
router.post(
  "/add",
  authMiddleware.authMiddleware,
  cartMiddleware.ensureCartExists,
  cartController.addItemToCart
);
router.post(
  "/update",
  authMiddleware.authMiddleware,
  cartMiddleware.ensureCartExists,
  cartController.updateItemQuantity
);
router.post(
  "/remove",
  authMiddleware.authMiddleware,
  cartMiddleware.ensureCartExists,
  cartController.removeItemFromCart
);
router.post("/sync", authMiddleware.authMiddleware, cartController.syncCart);
router.post("/merge", authMiddleware.authMiddleware, cartController.mergeCart);

module.exports = router;
