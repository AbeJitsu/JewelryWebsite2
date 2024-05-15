// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/server.js

require("module-alias/register");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
const winston = require("winston");
const connectDB = require("./config/db");
const createSessionConfig = require("./config/session");
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

connectDB();
const app = express();
app.set("trust proxy", 1);

app.use(cors(corsOptions));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(session(createSessionConfig())); // Use the session configuration
app.use(errorHandler); // Error handling middleware

app.use("/api", routes); // Ensure routes are prefixed with /api

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
