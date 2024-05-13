// /Users/abiezerreyes/Documents/JewelryWebsite2/server/src/server.js

// Main server file, sets up Express app, middleware, and routes
require("module-alias/register");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const winston = require("winston");
const connectDB = require("./config/db");
const routes = require("./api/routes/index");
const { errorHandler } = require("./api/middleware/errorHandling");

// Configure Winston logger for better error tracking
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

// CORS configuration for handling requests from different origins
const corsOptions = {
  origin: (origin, callback) => {
    console.log("Origin of request: " + origin); // This will log the origin of each request
    if (
      !origin ||
      ["http://localhost:8080", "http://localhost:3000"].includes(origin)
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"), false);
    }
  },
  credentials: true,
};


// Session configuration using MongoDB for session storage
const sessionConfig = {
  secret: process.env.SERVER_SESSION_SECRET,
  resave: false,
  saveUninitialized: false, // Updated to prevent empty sessions
  store: MongoStore.create({
    mongoUrl: process.env.SERVER_MONGODB_URI,
  }),
  cookie: {
    secure: process.env.SERVER_NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
  },
};

connectDB();
const app = express();
app.set("trust proxy", 1);

app.use(cors(corsOptions));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(session(sessionConfig));
app.use(errorHandler); // Error handling middleware

app.use("/api", routes);

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
  console.log(`Server listening on port ${port}`);
});

module.exports = app;

// /Users/abiezerreyes/Documents/JewelryWebsite2/server/src/server.js