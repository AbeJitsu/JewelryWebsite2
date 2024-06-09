// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/server.js

require("module-alias/register");
require("../../aliases.config");
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const connectDB = require("@/config/db");
const configureRoutes = require("@/config/configureRoutes");
const configureMiddleware = require("@/config/configureMiddleware");

// const applySessionMiddleware = require("@/config/session");

const app = express();
app.set("trust proxy", 1);

const startServer = async () => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.SERVER_MONGODB_URI;
    await mongoose.connect(mongoURI);
    console.log(`MongoDB connected: ${mongoURI}`);

    // Apply session middleware
    app.use(
      session({
        secret: process.env.SERVER_SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
          mongoUrl: mongoURI,
          collectionName: "sessions",
          ttl: 60 * 60 * 24, // 1 day
          stringify: false,
          autoRemove: "native",
        }),
        cookie: {
          maxAge: 60 * 60 * 24 * 1000, // 1 day
          secure: process.env.SERVER_NODE_ENV === "production",
          httpOnly: true,
          sameSite: "lax",
        },
      })
    );

    // Middleware to parse JSON bodies
    app.use(express.json());

    // Apply other middleware
    configureMiddleware(app);

    // Apply session middleware
    // applySessionMiddleware(app);

    // Configure Routes
    configureRoutes(app);

    // Simple test route to check session handling
    app.get("/test-session", (req, res) => {
      res.send("Test route working");
    });

    // Simple test route
    app.get("/", (req, res) => {
      res.send("Server is running");
    });

    // Start the server
    const port = process.env.SERVER_PORT || 3000;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();

module.exports = app;

// Uncomment and configure later
// require("module-alias/register");
// require("../../aliases.config");
// const connectDB = require("@/config/db");
// const { applySessionMiddleware } = require("@/config/session");
// const configureMiddleware = require("@/config/configureMiddleware");
// const configureRoutes = require("@/config/configureRoutes");

// const startServer = async () => {
//   // Connect to the database
//   await connectDB();

//   // Apply session middleware after database connection
//   console.log("Applying session middleware in server.js ...");
//   applySessionMiddleware(app);
//   console.log("Session middleware applied in server.js.");

//   // Configure middleware
//   console.log("Configuring middleware in server.js ...");
//   configureMiddleware(app);
//   console.log("Middleware configured in server.js ...");

//   // Setup routes
//   console.log("Setting up routes in server.js ...");
//   configureRoutes(app);
//   console.log("Routes setup complete in server.js ...");

//   const port = process.env.SERVER_PORT || 3000;
//   app.listen(port, () => {
//     console.log(`Server listening on port ${port}`);
//   });
// };

// startServer();

// module.exports = app;
