const express = require("express");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");

const connectDB = require("./config/db");
connectDB();

const createSessionConfig = require("./config/session");
const routes = require("./routes/index");
const errorHandlingMiddleware = require("./middleware/errorHandling");

const app = express();

// Trust the first proxy in front of the server
app.set("trust proxy", 1);

// Rate limiting to prevent abuse and to manage load on the server
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per 15-minute window
  message: "Too many requests from this IP, please try again after 15 minutes",
});

const port = process.env.PORT || 3000;

// Applying middleware
app.use(limiter);
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Ensure CORS settings are correct for frontend
    credentials: true, // Enable cookies across different domains (for sessions)
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(session(createSessionConfig())); // Apply the session configuration function

// Custom middleware to set userId and sessionToken
app.use((req, res, next) => {
  if (req.session && req.session.userId) {
    req.userId = req.session.userId;
    console.log("Middleware: User ID set:", req.userId);
  } else if (req.cookies && req.cookies.sessionToken) {
    req.sessionToken = req.cookies.sessionToken;
    console.log("Middleware: Session Token set:", req.sessionToken);
  }
  next();
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
