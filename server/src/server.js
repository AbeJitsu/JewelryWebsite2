// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/server.js
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");

// Load environment variables from .env file
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const mongoURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/jewelryStoreDB";

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
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: mongoURI }),
    cookie: {
      secure: process.env.NODE_ENV === "production", // Set to true in production
      maxAge: 168 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// API Route definitions
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

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
