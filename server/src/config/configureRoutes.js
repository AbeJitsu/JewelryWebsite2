// /Users/abiezerreyes/Documents/JewelryWebsite2/server/src/config/configureRoutes.js

const authRoutes = require("@/api/routes/authRoutes");
const cartRoutes = require("@/api/routes/cartRoutes");
const productRoutes = require("@/api/routes/productRoutes"); // Added product routes

module.exports = (app) => {
  // Setup routes prefixed with /api
  app.use("/api/auth", authRoutes);
  app.use("/api/cart", cartRoutes);
  app.use("/api/products", productRoutes); // Added product routes
};
