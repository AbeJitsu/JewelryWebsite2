//Users/abiezerreyes/Projects/JewelryWebsite2/server/src/routes/index.js

const router = require("express").Router();

const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const cartRoutes = require("./cartRoutes");
const paymentRoute = require("./paymentRoute");

router.use("/products", productRoutes);
router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/cart", cartRoutes);
router.use("/payment", paymentRoute);

module.exports = router;
