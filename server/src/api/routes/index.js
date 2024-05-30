// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/api/routes/index.js

const express = require("express");
const authRoutes = require("./authRoutes");
const cartRoutes = require("./cartRoutes");
const paymentRoutes = require("./paymentRoutes");
const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/cart", cartRoutes);
router.use("/payment", paymentRoutes);
router.use("/products", productRoutes);
router.use("/user", userRoutes);

module.exports = router;
