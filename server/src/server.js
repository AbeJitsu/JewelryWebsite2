// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/server.js

require("module-alias/register");
require("../../aliases.config");
require("dotenv").config();

const express = require("express");
const connectDB = require("@/config/db");
const configureMiddleware = require("@/config/configureMiddleware");
const configureRoutes = require("@/config/configureRoutes");

// Connect to the database
connectDB();

const app = express();
app.set("trust proxy", 1);

// Configure middleware
configureMiddleware(app);

// Setup routes
configureRoutes(app);

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
