//Users/abiezerreyes/Projects/JewelryWebsite2/server/src/util/authHelpers.js

const Cart = require("../models/CartModel");

exports.handleCartOnLogin = async (req, res, userId) => {
  try {
    // Assuming convertGuestCartToUserCart is defined in this file or properly imported
    await exports.convertGuestCartToUserCart(req.sessionID, userId);
    // Proceed with other login logic...
  } catch (error) {
    exports.handleError(res, error, "Failed to handle cart on login");
  }
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
      throw error; // Rethrow to be caught by the calling function
    }
  }
};

exports.handleError = (res, error, customMessage) => {
  console.error(`${customMessage}:`, error);
  res.status(500).json({ error: `${customMessage}: An error occurred` });
};