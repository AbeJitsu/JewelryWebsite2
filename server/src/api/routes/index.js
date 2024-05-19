// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/api/routes/index.js

const express = require("express");
const authRoutes = require("./authRoutes");
const cartRoutes = require("./cartRoutes");
const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");
const paymentRoute = require("./paymentRoute");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/cart", cartRoutes); // Ensure this line is correctly placed
router.use("/products", productRoutes);
router.use("/user", userRoutes);
router.use("/payment", paymentRoute);

module.exports = router;
