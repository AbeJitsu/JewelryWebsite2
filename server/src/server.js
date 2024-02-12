const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./productRoutes");
const app = express();
const port = 3000;
const mongoURI = "mongodb://localhost:27017/jewelryStoreDB";
const morgan = require("morgan");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api", productRoutes); // Prefix all routes with '/api'

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on port ${port}`);
});

// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/server.js