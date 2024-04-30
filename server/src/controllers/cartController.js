const Cart = require("../models/CartModel");
const Product = require("../models/ProductModel");
const moment = require("moment-timezone");
const cron = require("node-cron");

// Helper function to get the next Wednesday at noon for cart reservation expiry
function getNextWednesdayNoon() {
  let now = moment().tz("America/New_York");
  let nextWednesday = now.clone().day(3);
  if (now.day() > 3 || (now.day() === 3 && now.hour() >= 12)) {
    nextWednesday.add(1, "weeks");
  }
  nextWednesday.set({ hour: 12, minute: 0, second: 0, millisecond: 0 });
  return nextWednesday.toDate();
}

// Helper function to handle common response patterns
function handleResponse(res, promise) {
  promise
    .then((data) => res.status(200).send(data))
    .catch((error) => {
      console.error("Operation failed:", error);
      res.status(500).send({ message: error.message });
    });
}

const cartController = {
  convertGuestCartToUserCart: async (req, res) => {
    const { sessionToken, userId } = req.body;
    handleResponse(res, Cart.convertGuestCartToUserCart(sessionToken, userId));
  },
  getCartItems: async (req, res) => {
    const query = {
      $or: [{ user: req.session.userId }, { sessionToken: req.sessionID }],
    };
    handleResponse(res, Cart.findOne(query).populate("items.product"));
  },
  addItemToCart: async (req, res) => {
    const { productId, quantity } = req.body;
    if (!productId || quantity < 1) {
      return res
        .status(400)
        .send({ message: "Invalid product ID or quantity" });
    }
    const userId = req.session.userId || null;
    const sessionToken = req.sessionID;
    const reservedUntil = getNextWednesdayNoon();

    try {
      const product = await Product.findById(productId);
      if (!product || product.status !== "available") {
        throw new Error("Product not available");
      }
      product.status = "in cart";
      await product.save();

      const cart =
        (await Cart.findOne({ $or: [{ user: userId }, { sessionToken }] })) ||
        new Cart({ user: userId, sessionToken, items: [] });
      updateCart(cart, productId, quantity, reservedUntil);
      const updatedCart = await cart.save();
      res
        .status(200)
        .send({ message: "Item added to cart", cart: updatedCart });
    } catch (error) {
      console.error("Error adding item to cart:", error);
      res.status(500).send({ message: error.message });
    }
  },
  updateCartItem: async (req, res) => {
    const { itemId, quantity } = req.params;
    if (!itemId || quantity < 1) {
      return res.status(400).send({ message: "Invalid item ID or quantity" });
    }
    handleResponse(
      res,
      Cart.findOneAndUpdate(
        { "items._id": itemId },
        { $set: { "items.$.quantity": quantity } },
        { new: true }
      )
    );
  },
  removeItemFromCart: async (req, res) => {
    const { itemId } = req.params;
    handleResponse(
      res,
      Cart.findOneAndUpdate(
        { "items._id": itemId },
        { $pull: { items: { _id: itemId } } },
        { new: true }
      )
    );
  },
  scheduleCartClearance: () => {
    cron.schedule(
      "0 12 * * 3",
      async () => {
        console.log("Running task to clear expired carts");
        const deadline = getNextWednesdayNoon();
        await Cart.updateMany(
          { "items.reservedUntil": { $lt: deadline } },
          { $pull: { items: { reservedUntil: { $lt: deadline } } } }
        );
        console.log("Expired carts cleared");
      },
      { scheduled: true, timezone: "America/New_York" }
    );
  },
};

function updateCart(cart, productId, quantity, reservedUntil) {
  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );
  if (itemIndex > -1) {
    cart.items[itemIndex].quantity = quantity;
    cart.items[itemIndex].reservedUntil = reservedUntil;
  } else {
    cart.items.push({ product: productId, quantity, reservedUntil });
  }
}

module.exports = cartController;
