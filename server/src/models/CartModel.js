// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/models/CartModel.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, default: 1 },
});

const cartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", default: null },
  sessionToken: { type: String, default: null },
  items: [cartItemSchema],
});

module.exports = mongoose.model("Cart", cartSchema);
