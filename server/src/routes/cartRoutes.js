const express = require("express");
const router = express.Router();

// Import the cartController
const cartController = require("../controllers/cartController");

// Route to add an item to the cart
router.post("/add", cartController.addItemToCart);

// Route to update an item in the cart (e.g., quantity)
router.put("/update/:itemId", cartController.updateCartItem);

// Route to remove an item from the cart
router.delete("/remove/:itemId", cartController.removeItemFromCart);

// Route to get the current cart items for the user/session
router.get("/", cartController.getCartItems);

// Additional route to handle cart conversion for guests becoming registered users
// This route could be triggered after a guest user registers or logs in,
// effectively transferring their cart items to their new or existing user account.
router.post("/convert", cartController.convertGuestCartToUserCart);

module.exports = router;
