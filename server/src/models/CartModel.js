// Users/abiezerreyes/Projects/JewelryWebsite2/server/src/models/CartModel.js

const mongoose = require("mongoose");
const moment = require("moment-timezone");
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
  reservedUntil: {
    type: Date,
    required: true,
  },
});

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    sessionToken: {
      type: String,
      default: null,
    },
    items: [cartItemSchema],
  },
  {
    timestamps: true,
  }
);

// Add an item to the cart
cartSchema.methods.addItem = function (item) {
  const existingItemIndex = this.items.findIndex(
    (i) => i.product.toString() === item.product.toString()
  );
  if (existingItemIndex > -1) {
    this.items[existingItemIndex].quantity += item.quantity;
  } else {
    this.items.push(item);
  }
};

// Remove an item from the cart
cartSchema.methods.removeItem = function (productId) {
  this.items = this.items.filter(
    (i) => i.product.toString() !== productId.toString()
  );
};

// Clear expired items from the cart
cartSchema.methods.clearExpiredItems = function () {
  const now = new Date();
  this.items = this.items.filter((item) => item.reservedUntil > now);
};

// Convert a guest cart to a user cart
cartSchema.statics.convertGuestCartToUserCart = async function (
  sessionToken,
  userId
) {
  const cart = await this.findOne({ sessionToken: sessionToken });
  if (cart) {
    cart.user = userId;
    cart.sessionToken = null; // Clear the session token since it's no longer a guest cart
    await cart.save();
  }
};

module.exports = mongoose.model("Cart", cartSchema);
