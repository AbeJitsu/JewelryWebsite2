// Users/abiezerreyes/Projects/JewelryWebsite2/server/src/controllers/cartController.js

const Cart = require("../models/CartModel");
const Product = require("../models/ProductModel");
const moment = require("moment-timezone");
const cron = require("node-cron");

function getNextWednesdayNoon() {
  let now = moment().tz("America/New_York");
  let nextWednesday = now.clone().day(3);
  if (now.day() > 3 || (now.day() === 3 && now.hour() >= 12)) {
    nextWednesday.add(1, "weeks");
  }
  nextWednesday.set({ hour: 12, minute: 0, second: 0, millisecond: 0 });
  return nextWednesday.toDate();
}

const cartController = {
  getCartItems: async (req, res) => {
    try {
      // Find the cart based on session ID or user ID
      let cart = await Cart.findOne({
        $or: [{ user: req.session.userId }, { sessionToken: req.sessionID }],
      }).populate("items.product"); // Populate to get product details

      if (!cart) {
        return res.status(404).send({ message: "Cart not found" });
      }

      res.status(200).send(cart.items);
    } catch (error) {
      console.error("Error getting cart items:", error);
      res.status(500).send({ message: "Error fetching cart items" });
    }
  },
  addItemToCart: async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const userId = req.session.userId || null;
      const sessionToken = req.sessionID;

      const product = await Product.findById(productId);
      if (!product || product.status !== "available") {
        return res.status(400).send({ message: "Product not available" });
      }

      // Update product status
      product.status = "in cart";
      await product.save();

      let cart = await Cart.findOne({
        $or: [{ user: userId }, { sessionToken: sessionToken }],
      });

      if (!cart) {
        cart = new Cart({
          user: userId,
          sessionToken: sessionToken,
          items: [
            {
              product: productId,
              quantity: quantity,
              reservedUntil: getNextWednesdayNoon(),
            },
          ],
        });
      } else {
        const itemIndex = cart.items.findIndex(
          (item) => item.product.toString() === productId
        );
        if (itemIndex > -1) {
          cart.items[itemIndex].quantity = quantity;
          cart.items[itemIndex].reservedUntil = getNextWednesdayNoon();
        } else {
          cart.items.push({
            product: productId,
            quantity: quantity,
            reservedUntil: getNextWednesdayNoon(),
          });
        }
      }

      await cart.save();
      res.status(200).send({ message: "Item added to cart", cart });
    } catch (error) {
      console.error("Add item to cart error:", error);
      res.status(500).send({ message: "Error adding item to cart" });
    }
  },

  updateCartItem: async (req, res) => {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).send({ message: "Invalid quantity" });
    }

    try {
      const cart = await Cart.findOneAndUpdate(
        { "items._id": itemId },
        { $set: { "items.$.quantity": quantity } },
        { new: true }
      );

      if (!cart) {
        return res.status(404).send({ message: "Cart item not found" });
      }

      res.status(200).send({ message: "Cart item updated", cart });
    } catch (error) {
      console.error("Update cart item error:", error);
      res.status(500).send({ message: "Error updating cart item" });
    }
  },

  removeItemFromCart: async (req, res) => {
    const { itemId } = req.params;

    try {
      const cart = await Cart.findOneAndUpdate(
        { "items._id": itemId },
        { $pull: { items: { _id: itemId } } },
        { new: true }
      );

      if (!cart) {
        return res.status(404).send({ message: "Cart item not found" });
      }

      res.status(200).send({ message: "Cart item removed", cart });
    } catch (error) {
      console.error("Remove cart item error:", error);
      res.status(500).send({ message: "Error removing cart item" });
    }
  },

  scheduleCartClearance: () => {
    cron.schedule(
      "0 12 * * 3",
      async () => {
        console.log("Running task to clear expired carts");
        const deadline = getNextWednesdayNoon();
        const carts = await Cart.find({
          "items.reservedUntil": { $lt: deadline },
        });

        for (let cart of carts) {
          for (let item of cart.items) {
            if (item.reservedUntil < deadline) {
              const product = await Product.findById(item.product);
              product.status = "available";
              await product.save();
            }
          }
          cart.items = cart.items.filter(
            (item) => item.reservedUntil >= deadline
          );
          await cart.save();
        }

        console.log("Expired carts cleared");
      },
      {
        scheduled: true,
        timezone: "America/New_York",
      }
    );
  },

  clearExpiredCarts: async () => {
    const deadline = getNextWednesdayNoon();
    const carts = await Cart.find({ "items.reservedUntil": { $lt: deadline } });

    for (let cart of carts) {
      for (let item of cart.items) {
        if (item.reservedUntil < deadline) {
          const product = await Product.findById(item.product);
          product.status = "available";
          await product.save();
        }
      }
      cart.items = cart.items.filter((item) => item.reservedUntil >= deadline);
      await cart.save();
    }
  },
};

cartController.scheduleCartClearance();

module.exports = cartController;
