const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const {
  authMiddleware,
  roleMiddleware,
} = require("../middleware/authMiddleware");

// Applying authentication middleware to all cart modification routes
router.use(authMiddleware);

// Route handlers for cart operations
router.post("/add", cartController.addItemToCart); // Adds an item to the cart
router.put("/update/:itemId", cartController.updateCartItem); // Updates the quantity of an existing cart item
router.delete("/remove/:itemId", cartController.removeItemFromCart); // Removes an item from the cart

// General cart and session management
router.get("/", cartController.getCartItems); // Retrieves the current cart items for a user or session
router.post("/convert", cartController.convertGuestCartToUserCart); // Converts a guest cart to a registered user cart

// The syncing route is updated to handle periodic or debounced sync from the client-side
router.post("/sync", cartController.syncCart); // Handles the debounced synchronization of cart items

// Optional: Apply role-based middleware if specific roles are required for any cart operation
// This can help manage access to certain actions based on user roles.
// Example: router.post("/add", roleMiddleware(['admin', 'editor']), cartController.addItemToCart);

module.exports = router;
