// Load environment variables from .env file
require("dotenv").config();

// Import necessary modules
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");
const crypto = require("crypto");
const { Client, Environment } = require("square");
const User = require("./models/userModel");

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

// Configure session with MongoDB store
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Secret key for signing the session ID
    resave: false,
    saveUninitialized: true, // Ensure sessions are always saved, important during development
    store: MongoStore.create({
      mongoUrl: mongoURI,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production only
      httpOnly: true, // Ensuring the cookie is sent only over HTTP(S), not client JavaScript
      sameSite: "lax", // This setting can help prevent CSRF attacks
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Middleware to set session expiration based on user status
app.use(async (req, res, next) => {
  if (req.session.userId) {
    const user = await User.findById(req.session.userId);
    if (user && user.isVIP) {
      req.session.cookie.maxAge = computeVIPExpiration(); // Extend session for VIPs
    } else {
      req.session.cookie.maxAge = 48 * 60 * 60 * 1000; // 48 hours for regular users
    }
  }
  next();
});

// Calculate next Wednesday at 6 AM EST - used for session management for VIPs
function computeVIPExpiration() {
  let now = new Date();
  let nextWednesday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + ((3 - now.getDay() + 7) % 7 || 7),
    6
  );
  if (now > nextWednesday) {
    nextWednesday.setDate(nextWednesday.getDate() + 7);
  }
  return nextWednesday - now;
}

// Define API routes
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);

// Define route for processing payments
app.post("/api/payment", async (req, res) => {
  const { token, amount, currency } = req.body;

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
        amount: Math.round(amount * 100),
        currency,
      },
      idempotencyKey,
    };

    const { result, ...httpResponse } = await paymentsApi.createPayment(
      requestBody
    );

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

// Error handling middleware for unexpected errors
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
