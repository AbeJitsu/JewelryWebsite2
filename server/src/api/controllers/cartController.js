// server/src/api/controllers/cartController.js
const Cart = require("../models/cartModel");
const Product = require("@/api/models/productModel");
const cartService = require("@/services/cartService");

// Utility function to construct the query object
const getCartQuery = (req) => {
  const sessionId = req.user_id;
  const userId = req.user ? req.user._id : null;
  return userId ? { user: userId } : { sessionToken: sessionId };
};

exports.getCart = async (req, res) => {
  try {
    const query = getCartQuery(req);
    const cart = await cartService.getCart(query);
    if (!cart) return res.status(404).send({ message: "Cart not found" });
    res.status(200).send(cart);
  } catch (error) {
    console.error("Failed to retrieve cart:", error);
    res
      .status(500)
      .send({ message: "Failed to retrieve cart", error: error.message });
  }
};

exports.addItemToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  if (!productId || !quantity) {
    return res
      .status(400)
      .send({ message: "'productId' and 'quantity' are required." });
  }

  try {
    const query = getCartQuery(req);
    const cart = await cartService.addItemToCart(query, productId, quantity);
    res.status(200).send(cart);
  } catch (error) {
    console.error("Failed to add item to cart:", error);
    res
      .status(500)
      .send({ message: "Failed to add item to cart", error: error.message });
  }
};

exports.updateItemQuantity = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const query = getCartQuery(req);
    const cart = await cartService.updateItemQuantity(
      query,
      productId,
      quantity
    );
    res.status(200).send(cart);
  } catch (error) {
    console.error("Failed to update item quantity:", error);
    res.status(500).send({
      message: "Failed to update item quantity",
      error: error.message,
    });
  }
};

exports.removeItemFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    const query = getCartQuery(req);
    const cart = await cartService.removeItemFromCart(query, productId);
    res.status(200).send(cart);
  } catch (error) {
    console.error("Failed to remove item from cart:", error);
    res.status(500).send({
      message: "Failed to remove item from cart",
      error: error.message,
    });
  }
};

exports.syncCart = async (req, res) => {
  try {
    const query = getCartQuery(req);
    const cart = await cartService.syncCart(query, req.body.cartItems);
    res.status(200).send(cart);
  } catch (error) {
    console.error("Failed to sync cart", error);
    res
      .status(500)
      .send({ message: "Failed to sync cart", error: error.message });
  }
};

exports.mergeCart = async (req, res) => {
  try {
    const query = getCartQuery(req);
    const mergedCart = await cartService.mergeCart(
      query,
      req.body.localCartItems
    );
    res.status(200).send(mergedCart);
  } catch (error) {
    console.error("Failed to merge cart:", error);
    res
      .status(500)
      .send({ message: "Failed to merge cart", error: error.message });
  }
};
