// server/src/server.js

// Main server file, sets up Express app, middleware, and routes

const express = require("express");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const winston = require("winston");

// Configure Winston logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

// CORS options setup
const corsOptions = {
  origin:
    process.env.SERVER_NODE_ENV === "production"
      ? "https://yourproductiondomain.com"
      : ["http://localhost:8080", "http://localhost:3000"],
  credentials: true,
};

// Session configuration
const sessionConfig = {
  secret: process.env.SERVER_SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.SERVER_MONGODB_URI }),
  cookie: {
    secure: process.env.SERVER_NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
  },
};

// Import custom middleware and routes
const cartMiddleware = require("./middleware/cartMiddleware");
const connectDB = require("./config/db");
const routes = require("./routes/index");
const errorHandlingMiddleware = require("./middleware/errorHandling");

connectDB();
const app = express();
app.set("trust proxy", 1);

// Apply middleware
app.use(cors(corsOptions));
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message:
      "Too many requests from this IP, please try again after 15 minutes",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  morgan("dev", { stream: { write: (message) => logger.info(message) } })
);
app.use(session(sessionConfig));
app.use(cartMiddleware);

// Middleware to ensure session reloads
app.use(async (req, res, next) => {
  await req.session.reload((err) => {
    if (err) {
      logger.error("Error reloading session:", err);
      return next(err);
    }
    if (req.session && req.session.userId) {
      req.userId = req.session.userId;
      logger.info("Middleware: User ID set:", req.userId);
    } else {
      logger.info("Middleware: No session or token found");
    }
    next();
  });
});

// Setup routes
app.use("/api", routes);
app.use(errorHandlingMiddleware);

const port = process.env.SERVER_PORT || 3000;
if (require.main === module) {
  app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
  });
}

module.exports = app;
