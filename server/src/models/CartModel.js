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

cartSchema.methods.addItem = function (item) {
  const existingItemIndex = this.items.findIndex(
    (i) => i.product.toString() === item.product.toString()
  );
  if (existingItemIndex > -1) {
    this.items[existingItemIndex].quantity = Math.max(
      this.items[existingItemIndex].quantity,
      item.quantity
    );
  } else {
    this.items.push(item);
  }
};

cartSchema.methods.removeItem = function (productId) {
  this.items = this.items.filter(
    (i) => i.product.toString() !== productId.toString()
  );
};

cartSchema.methods.clearExpiredItems = function () {
  const now = new Date();
  this.items = this.items.filter((item) => item.reservedUntil > now);
};

cartSchema.statics.convertGuestCartToUserCart = async function (
  sessionToken,
  userId
) {
  const guestCart = await this.findOne({ sessionToken: sessionToken }).populate(
    "items.product"
  );
  const userCart = await this.findOne({ user: userId });

  if (guestCart) {
    // Remove unavailable items from the guest cart before merging
    guestCart.items = guestCart.items.filter(
      (item) => item.product && item.product.status === "available"
    );

    if (userCart) {
      guestCart.items.forEach((guestItem) => {
        const existingItem = userCart.items.find(
          (userItem) =>
            userItem.product.toString() === guestItem.product.toString()
        );
        if (existingItem) {
          existingItem.quantity = Math.max(
            existingItem.quantity,
            guestItem.quantity
          );
        } else {
          userCart.items.push(guestItem);
        }
      });
      await userCart.save();
      await guestCart.remove();
    } else {
      guestCart.user = userId;
      guestCart.sessionToken = null;
      await guestCart.save();
    }
  }
};

module.exports = mongoose.model("Cart", cartSchema);
