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
  async convertGuestCartToUserCart(req, res) {
    const { sessionToken, userId } = req.body;
    try {
      const result = await Cart.convertGuestCartToUserCart(
        sessionToken,
        userId
      );
      res
        .status(200)
        .send({ message: "Cart conversion successful", cart: result });
    } catch (error) {
      console.error("Error converting guest cart to user cart:", error);
      res
        .status(500)
        .send({ message: "Error converting cart", error: error.message });
    }
  },

  async getCartItems(req, res) {
    const userId = req.session?.userId;
    const sessionToken = req.session?.sessionToken;

    try {
      const cart = await Cart.findOne({
        $or: [{ user: userId }, { sessionToken: sessionToken }],
      }).populate("items.product");

      if (!cart) {
        return res.status(404).send({ message: "Cart not found" });
      }

      res.status(200).send(cart.items);
    } catch (error) {
      console.error("Error getting cart items:", error);
      res
        .status(500)
        .send({ message: "Error fetching cart items", error: error.message });
    }
  },

  async addItemToCart(req, res) {
    const { productId, quantity } = req.body;
    const userId = req.session?.userId;
    const sessionToken = req.sessionID;

    try {
      const product = await Product.findById(productId);
      if (!product || product.status !== "available") {
        return res.status(400).send({ message: "Product not available" });
      }

      product.status = "in cart";
      await product.save();

      const cart = await Cart.findOneAndUpdate(
        { $or: [{ user: userId }, { sessionToken: sessionToken }] },
        {
          $push: {
            items: {
              product: productId,
              quantity,
              reservedUntil: getNextWednesdayNoon(),
            },
          },
        },
        { upsert: true, new: true }
      );

      res.status(200).send({ message: "Item added to cart", cart });
    } catch (error) {
      console.error("Add item to cart error:", error);
      res
        .status(500)
        .send({ message: "Error adding item to cart", error: error.message });
    }
  },

  async updateCartItem(req, res) {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).send({ message: "Invalid quantity" });
    }

    try {
      const cart = await Cart.findOneAndUpdate(
        { "items._id": itemId },
        { "items.$.quantity": quantity },
        { new: true }
      );

      if (!cart) {
        return res.status(404).send({ message: "Cart item not found" });
      }

      res.status(200).send({ message: "Cart item updated", cart });
    } catch (error) {
      console.error("Update cart item error:", error);
      res
        .status(500)
        .send({ message: "Error updating cart item", error: error.message });
    }
  },

  async removeItemFromCart(req, res) {
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
      res
        .status(500)
        .send({ message: "Error removing cart item", error: error.message });
    }
  },

  scheduleCartClearance() {
    cron.schedule(
      "0 12 * * 3",
      async () => {
        console.log("Running task to clear expired carts");
        try {
          const deadline = getNextWednesdayNoon();
          const carts = await Cart.updateMany(
            { "items.reservedUntil": { $lt: deadline } },
            { $pull: { items: { reservedUntil: { $lt: deadline } } } }
          );
          console.log("Expired carts cleared", carts);
        } catch (error) {
          console.error("Failed to clear expired carts:", error);
        }
      },
      {
        scheduled: true,
        timezone: "America/New_York",
      }
    );
  },
  async clearExpiredCarts() {
        const deadline = getNextWednesdayNoon();
        try {
            const carts = await Cart.find({ "items.reservedUntil": { $lt: deadline } });
            for (let cart of carts) {
                for (let item of cart.items) {
                    if (item.reservedUntil < deadline) {
                        const product = await Product.findById(item.product);
                        if (product) {
                            product.status = "available";
                            await product.save();
                        }
                    }
                }
                cart.items = cart.items.filter(item => item.reservedUntil >= deadline);
                await cart.save();
            }
            console.log("Expired carts cleared");
        } catch (error) {
            console.error("Failed to clear expired carts:", error);
        }
    },

    scheduleCartClearance() {
        cron.schedule("0 12 * * 3", async () => {
            console.log("Scheduled task to clear expired carts running");
            await this.clearExpiredCarts();
        }, {
            scheduled: true,
            timezone: "America/New_York"
        });
    }
};

module.exports = cartController;
