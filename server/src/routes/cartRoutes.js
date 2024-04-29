// server/src/routes/cartRoutes.js

const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// Route handlers for cart operations
router.post("/add", cartController.addItemToCart); // Adds an item to the cart
router.put("/update/:itemId", cartController.updateCartItem); // Updates the quantity of an existing cart item
router.delete("/remove/:itemId", cartController.removeItemFromCart); // Removes an item from the cart

// General cart and session management
router.get("/", cartController.getCartItems); // Retrieves the current cart items for a user or session
router.post("/convert", cartController.convertGuestCartToUserCart); // Converts a guest cart to a registered user cart

// Route to handle syncing the entire cart
router.post(["/", ""], cartController.syncCartItems); // Syncs the entire cart to the database

module.exports = router;

