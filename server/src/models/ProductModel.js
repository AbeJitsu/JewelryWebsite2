// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/models/ProductModel.js

const mongoose = require("mongoose");
const moment = require("moment-timezone");

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
  status: {
    type: String,
    enum: ["available", "in cart", "purchased"],
    default: "available",
  },
  colors: [{ type: String }],
  materials: [{ type: String }],
  looks: [{ type: String }],
  styles: [{ type: String }],
  reservationDeadline: {
    type: Date,
    default: () =>
      moment()
        .tz("America/New_York")
        .add(4, "days")
        .hour(12)
        .minute(0)
        .second(0)
        .millisecond(0)
        .toDate(), // Default to next Wednesday at noon
  },
});

productSchema.pre("save", function (next) {
  if (this.variantPrice == 25) {
    this.type = "zi";
  } else if (
    this.variantPrice == 20 ||
    this.bodyHtml.toLowerCase().includes("fashion-fix")
  ) {
    this.type = "fashion-fix";
  } else {
    this.type = "everyday";
  }
  next();
});

productSchema.methods.reserve = function () {
  if (this.quantity > 0 && this.status == "available") {
    this.status = "in cart";
    this.reservationDeadline = moment()
      .tz("America/New_York")
      .add(4, "days")
      .hour(12)
      .minute(0)
      .second(0)
      .millisecond(0)
      .toDate(); // Adjust based on the cart clearance logic
    return this.save();
  }
};

productSchema.methods.releaseReservation = function () {
  if (this.status === "in cart") {
    this.status = "available";
    this.reservationDeadline = null;
    return this.save();
  }
};

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
