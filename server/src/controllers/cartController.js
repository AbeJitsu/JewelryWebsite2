// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/controllers/cartController.js
const Cart = require("../models/CartModel");

exports.getCart = async (req, res) => {
  const { sessionToken, userId } = req;
  const query = userId ? { user: userId } : { sessionToken: sessionToken };
  const cart = await Cart.findOne(query).populate("items.product");
  res.status(200).send(cart);
};

exports.addItemToCart = async (req, res) => {
  const { productId, quantity, sessionToken, userId } = req.body;
  const query = userId ? { user: userId } : { sessionToken: sessionToken };
  const update = {
    $push: { items: { product: productId, quantity: quantity } },
  };
  const cart = await Cart.findOneAndUpdate(query, update, {
    new: true,
    upsert: true,
  }).populate("items.product");
  res.status(200).send(cart);
};
