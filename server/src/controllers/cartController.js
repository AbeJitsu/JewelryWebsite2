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

    Product.findById(productId)
      .then((product) => {
        if (!product || product.status !== "available")
          throw new Error("Product not available");
        product.status = "in cart";
        return product.save();
      })
      .then(() => Cart.findOne({ $or: [{ user: userId }, { sessionToken }] }))
      .then((cart) =>
        cart
          ? updateCart(cart)
          : new Cart({
              user: userId,
              sessionToken,
              items: [{ product: productId, quantity, reservedUntil }],
            }).save()
      )
      .then((cart) =>
        res.status(200).send({ message: "Item added to cart", cart })
      )
      .catch((error) => {
        console.error("Error adding item to cart:", error);
        res.status(500).send({ message: error.message });
      });

    function updateCart(cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity;
        cart.items[itemIndex].reservedUntil = reservedUntil;
      } else {
        cart.items.push({ product: productId, quantity, reservedUntil });
      }
      return cart.save();
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
        Cart.updateMany(
          { "items.reservedUntil": { $lt: deadline } },
          { $pull: { items: { reservedUntil: { $lt: deadline } } } },
          { multi: true }
        ).then(() => console.log("Expired carts cleared"));
      },
      { scheduled: true, timezone: "America/New_York" }
    );
  },
};
syncCart: async (req, res) => {
  const { cartItems } = req.body; // Ensure `cartItems` structure matches the expected schema
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: req.session.userId || req.sessionID }, // Identifying the user or session cart
      { $set: { items: cartItems } },
      { new: true, upsert: true } // Update or create a new cart
    );
    res.status(200).send(cart);
  } catch (error) {
    console.error("Failed to sync cart items:", error);
    res.status(500).send({ message: "Failed to sync cart items" });
  }
},
  // Initialize scheduled tasks
  cartController.scheduleCartClearance();

module.exports = cartController;
