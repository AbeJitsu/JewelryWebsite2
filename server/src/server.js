const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

// Replace 'yourDatabaseName' with the name you want for your MongoDB database
const mongoURI = "mongodb://localhost:27017/jewelryStoreDB";

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

app.use(express.json());

const productRoutes = require("./productRoutes");

app.get("/", (req, res) => {
  res.send("Hello, World!!");
});

app.use("/products", productRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
