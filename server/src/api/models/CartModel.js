// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/api/models/CartModel.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, default: 1, min: 0 },
});

const cartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", default: null },
  sessionToken: { type: String, default: null },
  items: [cartItemSchema],
});

cartSchema.index({ user: 1, sessionToken: 1 });

cartSchema.pre("save", function (next) {
  if (!this.user && !this.sessionToken) {
    return next(new Error("A cart must have either a user or a session token"));
  }
  next();
});

// Static method to convert guest cart to user cart
cartSchema.statics.convertGuestCartToUserCart = async function (
  sessionToken,
  userId
) {
  const guestCart = await this.findOne({ sessionToken: sessionToken });
  if (!guestCart) {
    throw new Error("Guest cart not found");
  }

  let userCart = await this.findOne({ user: userId });

  if (userCart) {
    // Merge items
    guestCart.items.forEach((guestItem) => {
      const itemIndex = userCart.items.findIndex(
        (userItem) =>
          userItem.product.toString() === guestItem.product.toString()
      );
      if (itemIndex !== -1) {
        userCart.items[itemIndex].quantity += guestItem.quantity;
      } else {
        userCart.items.push(guestItem);
      }
    });
    await guestCart.remove();
  } else {
    // Assign user to guest cart
    guestCart.user = userId;
    guestCart.sessionToken = null;
    userCart = guestCart;
  }

  return await userCart.save();
};

module.exports = mongoose.model("Cart", cartSchema);