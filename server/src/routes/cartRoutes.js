// server/src/routes/cartRoutes.js
const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// Route descriptions help developers understand what each route does at a glance.

// Adds an item to the cart. Expects product ID and quantity in the request body.
router.post("/add", cartController.addItemToCart);

// Updates the quantity of an existing cart item. Expects the item ID as a URL parameter and quantity in the request body.
router.put("/update/:itemId", cartController.updateCartItem);

// Removes an item from the cart. The item ID is expected as a URL parameter.
router.delete("/remove/:itemId", cartController.removeItemFromCart);

// Retrieves the current cart items for a user or session.
router.get("/", cartController.getCartItems);

// Converts a guest cart to a registered user cart. Expects session token and user ID in the request body.
router.post("/convert", cartController.convertGuestCartToUserCart);

module.exports = router;
