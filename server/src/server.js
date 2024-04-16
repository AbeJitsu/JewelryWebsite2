// Load environment variables from .env file
require("dotenv").config();

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

const app = express();
const port = process.env.PORT || 3000;
const mongoURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/jewelryStoreDB";

// Square Client Configuration
const squareClient = new Client({
  environment: Environment.Sandbox, // Use Environment.Production for production
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

// Middleware setup
app.use(
  cors({
    origin: "http://localhost:8080", // Replace with your frontend's actual URL
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// MongoDB Connection
mongoose
  .connect(mongoURI)
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: mongoURI,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }, // Ensuring the use of new MongoDB driver options
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production only
      httpOnly: true, // Ensuring the cookie is sent only over HTTP(S), not client JavaScript, enhancing security against cross-site scripting attacks
      sameSite: "lax", // This setting can help prevent CSRF attacks and is good for cookies that can be sent in third-party contexts
    },
  })
);

// Dynamic session expiration middleware
app.use(async (req, res, next) => {
  if (req.session.userId) {
    const user = await User.findById(req.session.userId);
    if (user && user.isVIP) {
      req.session.cookie.maxAge = computeVIPExpiration(); // For VIP users, align expiration with Wednesday morning
    } else {
      req.session.cookie.maxAge = 48 * 60 * 60 * 1000; // 48 hours for regular users
    }
  }
  next();
});

// Function to calculate the next Wednesday at 6 AM EST
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
  return nextWednesday - now; // returns the milliseconds until next Wednesday at 6 AM
}

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
      idempotencyKey: idempotencyKey,
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
// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/server.js
