// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const morgan = require("morgan");
const productRoutes = require("./productRoutes");
const authRoutes = require("./routes/authRoutes"); // Make sure to adjust the path as necessary

const app = express();
const port = process.env.PORT || 3000; // Fallback to 3000 if the environment variable is not set
const mongoURI = "mongodb://localhost:27017/jewelryStoreDB";

// CORS Configuration to allow credentials and ensure the frontend can interact with the API
app.use(
  cors({
    origin: ["http://localhost:8080"], // Update this to match the URL of your frontend application
    credentials: true,
  })
);

// Session Configuration for secure cookie handling
app.use(
  session({
    secret: "your_secret_key", // Consider using environment variables for production
    resave: false,
    saveUninitialized: false, // Avoid creating session until something is stored
    cookie: {
      httpOnly: true, // Prevent client-side JS from accessing the cookie
      secure: false, // Should be set to true in production environments using HTTPS
      sameSite: "strict", // Strict CSRF protection
    },
  })
);

// Middleware for parsing JSON and logging requests
app.use(express.json()); // For parsing application/json
app.use(morgan("dev")); // Logging HTTP requests

// MongoDB Connection
mongoose
  .connect(mongoURI) // Adjust connection options if necessary
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// API Routes
app.use("/api", productRoutes);
app.use("/api", authRoutes); // Use authRoutes with the /api prefix

// Conditional server start to avoid conflicts during testing
if (require.main === module) {
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server listening on port ${port}`);
  });
}

module.exports = app;
