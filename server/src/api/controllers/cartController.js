// server/src/api/controllers/cartController.js

const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

exports.getCart = async (req, res) => {
  const sessionId = req.sessionID;
  const userId = req.user ? req.user.id : null;
  const query = userId ? { user: userId } : { sessionToken: sessionId };

  try {
    const cart = await Cart.findOne(query).populate("items.product");
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

  const sessionId = req.sessionID;
  const userId = req.user ? req.user.id : null;
  const query = userId ? { user: userId } : { sessionToken: sessionId };

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    let cart = await Cart.findOne(query);

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );
      if (itemIndex !== -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    } else {
      cart = new Cart({
        user: userId,
        sessionToken: sessionId,
        items: [{ product: productId, quantity }],
      });
      console.log("New guest cart created:", cart);
    }

    await cart.save();
    const updatedCart = await Cart.findOne(query).populate("items.product");
    res.status(200).send(updatedCart);
  } catch (error) {
    console.error("Error adding/updating item in cart:", error);
    res.status(500).send({
      message: "Failed to add/update item in cart",
      error: error.message,
    });
  }
};

exports.updateItemQuantity = async (req, res) => {
  const { productId, quantity } = req.body;

  const sessionId = req.sessionID;
  const userId = req.user ? req.user.id : null;
  const query = userId ? { user: userId } : { sessionToken: sessionId };

  try {
    const cart = await Cart.findOne(query);
    if (!cart) return res.status(404).send({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (itemIndex !== -1) {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      const updatedCart = await Cart.findOne(query).populate("items.product");
      res.status(200).send(updatedCart);
    } else {
      res.status(404).send({ message: "Item not found in cart" });
    }
  } catch (error) {
    console.error("Error updating item quantity:", error);
    res.status(500).send({
      message: "Failed to update item quantity",
      error: error.message,
    });
  }
};

exports.removeItemFromCart = async (req, res) => {
  const { productId } = req.body;

  const sessionId = req.sessionID;
  const userId = req.user ? req.user.id : null;
  const query = userId ? { user: userId } : { sessionToken: sessionId };

  try {
    const cart = await Cart.findOneAndUpdate(
      query,
      { $pull: { items: { product: productId } } },
      { new: true }
    ).populate("items.product");
    if (!cart) return res.status(404).send({ message: "Cart not found" });
    res.status(200).send(cart);
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).send({
      message: "Failed to remove item from cart",
      error: error.message,
    });
  }
};

exports.syncCart = async (req, res) => {
  const { cartItems } = req.body;

  const sessionId = req.sessionID;
  const userId = req.user ? req.user.id : null;
  const query = userId ? { user: userId } : { sessionToken: sessionId };

  try {
    let cart = await Cart.findOne(query);
    if (!cart) {
      cart = new Cart({
        user: userId,
        sessionToken: sessionId,
        items: cartItems,
      });
    } else {
      cart.items = cartItems;
    }

    await cart.save();
    const updatedCart = await Cart.findOne(query).populate("items.product");
    res.status(200).send(updatedCart);
  } catch (error) {
    console.error("Error syncing cart with server:", error);
    res.status(500).send({
      message: "Failed to sync cart with server",
      error: error.message,
    });
  }
};

exports.mergeCart = async (req, res) => {
  // Ensure that req.user is not undefined
  if (!req.user || !req.user.id) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  const { localCartItems } = req.body;
  const userId = req.user.id; // Ensure this is correctly populated
  const sessionId = req.sessionID;

  try {
    let userCart = await Cart.findOne({ user: userId });

    if (!userCart) {
      userCart = new Cart({ user: userId, sessionToken: sessionId, items: [] });
    }

    for (const localItem of localCartItems) {
      const itemIndex = userCart.items.findIndex(
        (item) => item.product.toString() === localItem.product._id
      );
      if (itemIndex !== -1) {
        userCart.items[itemIndex].quantity += localItem.quantity;
      } else {
        userCart.items.push({
          product: localItem.product._id,
          quantity: localItem.quantity,
        });
      }
    }

    await userCart.save();
    const updatedCart = await Cart.findOne({ user: userId }).populate(
      "items.product"
    );
    res.status(200).send(updatedCart);
  } catch (error) {
    console.error("Error merging cart:", error);
    res
      .status(500)
      .send({ message: "Failed to merge cart", error: error.message });
  }
};
