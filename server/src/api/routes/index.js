// /Users/abiezerreyes/Documents/JewelryWebsite2/server/src/api/routes/index.js

const express = require("express");
const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const cartRoutes = require("./cartRoutes");
const paymentRoute = require("./paymentRoute");

const router = express.Router();

// Use the routes
router.use("/products", productRoutes);
router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/cart", cartRoutes);
router.use("/payment", paymentRoute);

module.exports = router;

