// Load environment variables from .env file
require("dotenv").config();

// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const { Client, Environment } = require("square");

// Import session configuration
const createSessionConfig = require("./config/session");

// Initialize Express application
const app = express();
const port = process.env.PORT || 3000;
const mongoURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/jewelryStoreDB";

// Configure Square payment client
const squareClient = new Client({
  environment: Environment.Sandbox, // Use Sandbox for testing, Production for live
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

// Middleware setup
app.use(
  cors({
    origin: "http://localhost:8080", // CORS setting to allow requests from your frontend URL
    credentials: true,
  })
);
app.use(express.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morgan("dev")); // Log HTTP requests in the console

// Connect to MongoDB using Mongoose
mongoose
  .connect(mongoURI)
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// Set up session with the configuration from session.js
app.use(require("express-session")(createSessionConfig()));

// API Route definitions
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);

// Payment processing route
app.post("/api/payment", async (req, res) => {
  const { token, amount, currency } = req.body;
  console.log("Received payment request with:", { token, amount, currency });

  if (!token || !amount || !currency) {
    return res
      .status(400)
      .json({ message: "Missing required payment details" });
  }

  try {
    const { paymentsApi } = squareClient;
    const idempotencyKey = crypto.randomBytes(12).toString("hex");
    const requestBody = {
      sourceId: token,
      amountMoney: {
        amount: Math.round(amount * 100), // Convert to cents
        currency,
      },
      idempotencyKey,
    };

    const { result, ...httpResponse } = await paymentsApi.createPayment(
      requestBody
    );
    console.log("Payment API response:", result);

    if (result.payment) {
      res.json({ message: "Payment successful", data: result.payment });
    } else {
      res
        .status(400)
        .json({ message: "Payment failed", errors: result.errors });
    }
  } catch (error) {
    console.error("Payment processing error:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// Error Handling Middleware for unexpected errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const errorMessage =
    process.env.NODE_ENV === "development" ? err.message : "Something broke!";
  res.status(statusCode).send({ error: errorMessage });
});

// Start server only if this file is run directly
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

module.exports = app;
