// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/models/CartModel.js

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

module.exports = mongoose.model("Cart", cartSchema);
