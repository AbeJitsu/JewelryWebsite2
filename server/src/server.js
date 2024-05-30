// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/server.js

require("module-alias/register");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
const connectDB = require("./config/db");
const createSessionConfig = require("./config/session");
const errorHandler = require("./api/middleware/errorHandling").errorHandler;
const routes = require("./api/routes/index");
const logger = require("./api/middleware/logger");

// Connect to the database
connectDB();

const app = express();
app.set("trust proxy", 1);

// Middleware configuration
app.use(logger);
const corsOptions = {
  origin: ["http://localhost:8080", "http://localhost:3000"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(session(createSessionConfig())); // Use the session configuration
app.use(errorHandler); // Error handling middleware

// Setup routes prefixed with /api
app.use("/api", routes);

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
