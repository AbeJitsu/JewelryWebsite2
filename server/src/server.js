// server.js

const express = require("express");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");

// Import the session configuration
const createSessionConfig = require("./config/session");

// Import custom middleware
const cartMiddleware = require("./middleware/cartMiddleware");

// Connect to the database
const connectDB = require("./config/db");
connectDB();

const routes = require("./routes/index");
const errorHandlingMiddleware = require("./middleware/errorHandling");

const app = express();

// Trust the first proxy in front of the server
app.set("trust proxy", 1);

// Rate limiting to prevent abuse and manage load on the server
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per 15-minute window
  message: "Too many requests from this IP, please try again after 15 minutes",
});

const port = process.env.PORT || 3000; // Initialize the port variable correctly

// Applying middleware
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Ensure CORS settings are correct for frontend
    credentials: true, // Enable cookies across different domains (for sessions)
  })
);
app.use(morgan("dev"));

// Use the cart middleware before session creation
app.use(session(createSessionConfig()));
app.use(cartMiddleware);

// Middleware to check for session asynchronously
app.use(async (req, res, next) => {
  // Adding await ensures MongoStore returns session before proceeding
  await req.session.reload(err => {
    if (err) {
      console.error("Error reloading session:", err);
    }
    // Check session data here
    if (req.session && req.session.userId) {
      req.userId = req.session.userId;
      console.log("Middleware: User ID set:", req.userId);
    } else {
      console.log("Middleware: No session or token found");
    }
    next();
  });
});

// Route setup
app.use("/api", routes);
app.use(errorHandlingMiddleware); // Global error handling

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

module.exports = app;
