const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  handle: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  bodyHtml: String,
  vendor: String,
  type: {
    type: String,
    enum: ["zi", "fashion-fix", "everyday"],
    default: "everyday",
  },
  variantSKU: String,
  variantPrice: Number,
  imageSrc: [String],
  imagePosition: [Number],
  quantity: { type: Number, default: 1 },
  // New fields for enhanced search capabilities
  colors: [{ type: String }],
  materials: [{ type: String }],
  looks: [{ type: String }],
  styles: [{ type: String }],
});

// Pre-save hook for setting product type based on price and description
productSchema.pre("save", function (next) {
  if (this.variantPrice === 25) {
    this.type = "zi";
  } else if (
    this.variantPrice === 20 ||
    this.bodyHtml.toLowerCase().includes("fashion-fix")
  ) {
    this.type = "fashion-fix";
  } else {
    this.type = "everyday";
  }
  // Additional logic to extract and assign colors, materials, looks, and styles
  // based on bodyHtml or other fields could be added here
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/models/ProductModel.js
