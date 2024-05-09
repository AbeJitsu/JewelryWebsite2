// /Users/abiezerreyes/Documents/JewelryWebsite2/server/src/api/routes/index.js

const router = require("express").Router();

// Import route handlers for various parts of the application
const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const cartRoutes = require("./cartRoutes");
const paymentRoute = require("./paymentRoute");

// Mount route groups to their respective base paths
router.use("/products", productRoutes); // Handles all product-related API endpoints
router.use("/users", userRoutes); // Handles all user-related API endpoints
router.use("/auth", authRoutes); // Handles all authentication-related API endpoints
router.use("/cart", cartRoutes); // Handles all cart-related API endpoints
router.use("/payment", paymentRoute); // Handles all payment-related API endpoints

module.exports = router;
