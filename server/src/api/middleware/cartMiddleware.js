// /Users/abiezerreyes/Documents/JewelryWebsite2/server/src/api/middleware/cartMiddleware.js

const Cart = require("../models/cartModel");

const ensureCartExists = async (req, res, next) => {
  console.log(`cartMiddleware Session ID (Before): ${req.sessionID}`);
  console.log(
    `cartMiddleware Session Data (Before): ${JSON.stringify(req.session)}`
  );

  try {
    let cart;
    if (req.session.userId) {
      // Find the cart associated with the logged-in user
      cart = await cart.findOne({ user: req.session.userId });
    } else {
      // Find the cart associated with the session ID
      cart = await Cart.findOne({ sessionToken: req.sessionID });
    }

    // If no cart is found, create a new one
    if (!cart) {
      cart = new Cart({
        user: req.session.userId || null,
        sessionToken: req.sessionID || null,
      });
      await cart.save();
    }

    // Attach the cart to the request object
    req.cart = cart;

    // Add a 10-second delay before moving to the next middleware
    setTimeout(() => {
      console.log(`cartMiddleware Session ID (After): ${req.sessionID}`);
      console.log(
        `cartMiddleware Session Data (After): ${JSON.stringify(req.session)}`
      );
      next();
    }, 10000); // 10 seconds delay
  } catch (error) {
    console.error("Error ensuring cart exists:", error);
    res
      .status(500)
      .send({ message: "Failed to ensure cart", error: error.message });
  }
};

module.exports = ensureCartExists;