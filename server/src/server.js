// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const morgan = require("morgan");
const bodyParser = require("body-parser");

// Adjust these paths as necessary to fit your project structure
const productRoutes = require("./productRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes"); // Corrected import for userRoutes

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = "mongodb://localhost:27017/jewelryStoreDB";

// Middleware setup
app.use(
  cors({
    origin: ["http://localhost:8080"],
    credentials: true,
  })
);

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    },
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// MongoDB Connection
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// API Route definitions
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); // Ensuring userRoutes are properly utilized

// Error Handling Middleware for unexpected errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something broke!" });
});

// Start server only if this file is run directly
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

module.exports = app;
