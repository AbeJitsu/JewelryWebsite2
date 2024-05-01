// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/controllers/cartController.js
const Cart = require("../models/CartModel");

// Retrieve cart based on session token or user ID
exports.getCart = async (req, res) => {
  const { sessionToken, userId } = req;
  const query = userId ? { user: userId } : { sessionToken: sessionToken };
  try {
    const cart = await Cart.findOne(query).populate("items.product");
    if (!cart) return res.status(404).send({ message: "Cart not found" });
    res.status(200).send(cart);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to retrieve cart", error: error.message });
  }
};

// Add an item to the cart
exports.addItemToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const { sessionToken, userId } = req;
  const query = userId ? { user: userId } : { sessionToken: sessionToken };

  try {
    const cart = await Cart.findOneAndUpdate(
      query,
      { $push: { items: { product: productId, quantity } } },
      { new: true, upsert: true }
    ).populate("items.product");
    res.status(200).send(cart);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to add item to cart", error: error.message });
  }
};

// Update the quantity of an item in the cart
exports.updateItemQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  const { sessionToken, userId } = req;
  const query = userId ? { user: userId } : { sessionToken: sessionToken };

  try {
    const cart = await Cart.findOne(query);
    if (!cart) return res.status(404).send({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (itemIndex !== -1) {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      res.status(200).send(cart);
    } else {
      res.status(404).send({ message: "Item not found in cart" });
    }
  } catch (error) {
    res
      .status(500)
      .send({
        message: "Failed to update item quantity",
        error: error.message,
      });
  }
};

// Remove an item from the cart
exports.removeItemFromCart = async (req, res) => {
  const { productId } = req.body;
  const { sessionToken, userId } = req;
  const query = userId ? { user: userId } : { sessionToken: sessionToken };

  try {
    const cart = await Cart.findOneAndUpdate(
      query,
      { $pull: { items: { product: productId } } },
      { new: true }
    ).populate("items.product");
    res.status(200).send(cart);
  } catch (error) {
    res
      .status(500)
      .send({
        message: "Failed to remove item from cart",
        error: error.message,
      });
  }
};
