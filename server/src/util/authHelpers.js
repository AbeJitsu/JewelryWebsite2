// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/util/authHelpers.js

const Cart = require("../models/CartModel");

exports.handleCartOnLogin = async (req, res, userId) => {
  // This method might already include merging the cart.
  await convertGuestCartToUserCart(req.sessionID, userId);
  // Proceed with other login logic...
};

exports.convertGuestCartToUserCart = async (sessionID, userID) => {
  const guestCart = await Cart.findOne({ sessionToken: sessionID });
  if (guestCart) {
    try {
      guestCart.user = userID;
      guestCart.sessionToken = null;
      await guestCart.save();
      console.log("Cart merge completed");
    } catch (error) {
      console.error("Cart merge error:", error);
    }
  }
};

exports.handleError = (res, error, customMessage) => {
  console.error(`${customMessage}:`, error);
  res.status(500).json({ error: `${customMessage}: An error occurred` });
};
