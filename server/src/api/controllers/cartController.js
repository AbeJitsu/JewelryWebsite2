// /Users/abiezerreyes/Documents/JewelryWebsite2/server/src/api/controllers/cartController.js

const Cart = require("@/api/models/cartModel");
const Product = require("@/api/models/productModel");

// Retrieve cart based on user ID or session ID
exports.getCart = async (req, res) => {
  const sessionId = req.sessionID;
  const userId = req.session.userId;
  const query = userId ? { user: userId } : { sessionToken: sessionId };

  try {
    const cart = await Cart.findOne(query).populate("items.product");
    if (!cart) return res.status(404).send({ message: "Cart not found" });
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send({
      message: "Failed to retrieve cart",
      error: error.message,
    });
  }
};

// Add or update an item in the cart
exports.addItemToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).send({
      message: "Invalid request: 'productId' and 'quantity' are required.",
    });
  }

  const sessionId = req.sessionID;
  const userId = req.session.userId;
  const query = userId ? { user: userId } : { sessionToken: sessionId };

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({
        message: "Product not found",
      });
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
        user: userId || null,
        sessionToken: sessionId || null,
        items: [{ product: productId, quantity }],
      });
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

// Update the quantity of an item in the cart
exports.updateItemQuantity = async (req, res) => {
  const { productId, quantity } = req.body;

  const sessionId = req.sessionID;
  const userId = req.session.userId;
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
      res.status(200).send(cart);
    } else {
      res.status(404).send({ message: "Item not found in cart" });
    }
  } catch (error) {
    res.status(500).send({
      message: "Failed to update item quantity",
      error: error.message,
    });
  }
};

// Remove an item from the cart
exports.removeItemFromCart = async (req, res) => {
  const { productId } = req.body;

  const sessionId = req.sessionID;
  const userId = req.session.userId;
  const query = userId ? { user: userId } : { sessionToken: sessionId };

  try {
    const cart = await Cart.findOneAndUpdate(
      query,
      { $pull: { items: { product: productId } } },
      { new: true }
    ).populate("items.product");
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send({
      message: "Failed to remove item from cart",
      error: error.message,
    });
  }
};

// Sync the cart with the server
exports.syncCart = async (req, res) => {
  const { cartItems } = req.body;

  const sessionId = req.sessionID;
  const userId = req.session.userId;
  const query = userId ? { user: userId } : { sessionToken: sessionId };

  try {
    let cart = await Cart.findOne(query);

    if (!cart) {
      cart = new Cart({
        user: userId || null,
        sessionToken: sessionId || null,
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