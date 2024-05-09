// /Users/abiezerreyes/Documents/JewelryWebsite2/server/src/api/middleware/cartMiddleware.js

module.exports = function (req, res, next) {
  const cartItems = req.body.cartItems || [];
  req.session.cartExists = cartItems.length > 0;
  console.log(
    `Cart is ${
      req.session.cartExists ? "not empty" : "empty"
    }, proceeding with session tracking.`
  );
  next();
};
