const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const productRoutes = require("./routes/productRoutes"); // Adjusted path if necessary
const authRoutes = require("./routes/authRoutes"); // Adjusted path if necessary

const app = express();
const port = process.env.PORT || 3000; // Use environment variable for PORT if available
const mongoURI = "mongodb://localhost:27017/jewelryStoreDB";

// Middleware
app.use(cors()); // Enable CORS for all requests
app.use(express.json()); // Parse JSON bodies
app.use(morgan("dev")); // Logging

// MongoDB Connection
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// Routes
// Separate routes for products and authentication to avoid potential conflicts
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// Server Start
app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on port ${port}`);
});

// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/server.js
