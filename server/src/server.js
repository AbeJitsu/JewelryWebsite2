// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/server.js

require("module-alias/register");
require("../../aliases.config");
require("dotenv").config();

const express = require("express");
const connectDB = require("@/config/db");
const { applySessionMiddleware } = require("@/config/session");
const configureMiddleware = require("@/config/configureMiddleware");
const configureRoutes = require("@/config/configureRoutes");

// Initialize express app
const app = express();
app.set("trust proxy", 1);

const startServer = async () => {
  // Connect to the database
  await connectDB();

  // Apply session middleware after database connection
  console.log("Applying session middleware in server.js ...");
  applySessionMiddleware(app);
  console.log("Session middleware applied in server.js.");

  // Configure middleware
  console.log("Configuring middleware in server.js ...");
  configureMiddleware(app);
  console.log("Middleware configured in server.js ...");

  // Setup routes
  console.log("Setting up routes in server.js ...");
  configureRoutes(app);
  console.log("Routes setup complete in server.js ...");

  const port = process.env.SERVER_PORT || 3000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

startServer();

module.exports = app;
