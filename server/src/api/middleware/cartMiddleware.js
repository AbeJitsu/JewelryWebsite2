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
      cart = await Cart.findOne({ user: req.session.userId });
    } else {
      cart = await Cart.findOne({ sessionToken: req.sessionID });
    }

    if (!cart) {
      cart = new Cart({
        user: req.session.userId || null,
        sessionToken: req.session.userId || req.sessionID,
      });
      await cart.save();
    }

    req.cart = cart;
    console.log(`cartMiddleware Session ID (After): ${req.sessionID}`);
    console.log(
      `cartMiddleware Session Data (After): ${JSON.stringify(req.session)}`
    );
    next();
  } catch (error) {
    console.error("Error ensuring cart exists", error);
    res
      .status(500)
      .send({ message: "Failed to ensure cart", error: error.message });
  }
};

module.exports = { ensureCartExists };
