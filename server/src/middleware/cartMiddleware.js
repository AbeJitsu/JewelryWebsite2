// cartMiddleware.js

module.exports = (req, res, next) => {
  const cartItems = req.body.cartItems || [];

  if (cartItems.length > 0) {
    console.log("Cart is not empty, proceeding with session creation");
    req.session.cartExists = true; // Set flag indicating cart is not empty
  } else {
    console.log("Cart is empty, initiating session for tracking");
    req.session.cartExists = false; // Set flag for empty cart
  }
  next(); // Continue to next middleware
};
