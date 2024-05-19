// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/api/models/cartModel.js

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
  console.log(
    `Attempting to convert guest cart to user cart for sessionToken: ${sessionToken}, userId: ${userId}`
  );

  const guestCart = await this.findOne({ sessionToken });
  if (!guestCart) {
    console.log("Guest cart not found for sessionToken:", sessionToken);
    return; // Instead of throwing an error, just return
  }

  console.log("Guest cart found:", guestCart);

  let userCart = await this.findOne({ user: userId });
  if (userCart) {
    console.log("User cart found, merging items...");
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
    console.log("User cart not found, assigning user to guest cart...");
    // Assign user to guest cart
    guestCart.user = userId;
    guestCart.sessionToken = null;
    userCart = guestCart;
  }

  const savedCart = await userCart.save();
  console.log("Cart after conversion:", savedCart);
  return savedCart;
};

module.exports = mongoose.model("Cart", cartSchema);
