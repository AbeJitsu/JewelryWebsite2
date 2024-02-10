const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  handle: { type: String, required: true, unique: true }, // Assuming 'Handle' is a unique identifier
  title: { type: String, required: true },
  bodyHtml: String, // 'Body (HTML)' field from the CSV
  vendor: String,
  type: String,
  variantSKU: String, // 'Variant SKU'
  variantPrice: Number, // 'Variant Price'
  imageSrc: [String], // To accommodate multiple image URLs, use an array of strings
  imagePosition: [Number], // To store the order of images, use an array of numbers
  // Add any other fields you deem necessary
  quantity: { type: Number, default: 1 }, // Set default quantity to 1
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/models/ProductModel.js
