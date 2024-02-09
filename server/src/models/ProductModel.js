// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/models/ProductModel.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String, // This is an optional field
  // You can add more fields based on your requirements
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
