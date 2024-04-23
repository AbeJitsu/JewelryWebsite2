// Load environment variables from .env file
require("dotenv").config();

// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
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
    origin: process.env.CORS_ORIGIN || "http://localhost:8080",
    credentials: true,
  })
);
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morgan("dev")); // Log HTTP requests in the console

// Connect to MongoDB using Mongoose
mongoose
  .connect(mongoURI)
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// Set up session with the configuration from session.js
app.use(require("express-session")(createSessionConfig()));

// API Route definitions
const routes = require("./routes");
app.use("/api", routes);

// Payment processing route
app.post("/api/payment", async (req, res) => {
  const { token, amount, currency } = req.body;
  if (!token || !amount || !currency) {
    return res
      .status(400)
      .json({ message: "Missing required payment details" });
  }

  try {
    const idempotencyKey = crypto.randomBytes(12).toString("hex");
    const { result } = await squareClient.paymentsApi.createPayment({
      sourceId: token,
      amountMoney: { amount: Math.round(amount * 100), currency },
      idempotencyKey,
    });
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

// Centralized error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.statusCode || 500)
    .send({ error: err.message || "An unexpected error occurred" });
});

// Start server only if this file is run directly
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

module.exports = app;
