// server/src/routes/cartRoutes.js

const express = require("express");
const router = express.Router();
const Cart = require("../models/CartModel");
const Product = require("../models/ProductModel");
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
router.post("/convert", cartController.convertGuestCartToUserCart);


// Test route for adding an item to the cart to validate functionality
router.post("/test-add", async (req, res) => {
  const { productId, quantity } = req.body;
  const sessionToken = "test-session-token"; // Static token for testing

  try {
    let cart = await Cart.findOne({ sessionToken });
    if (!cart) {
      cart = new Cart({
        sessionToken,
        items: [],
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart successfully", cart });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res
      .status(500)
      .send({ message: "Error adding item to cart", error: error.toString() });
  }
});

module.exports = router;
