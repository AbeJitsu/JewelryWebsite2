const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const productRoutes = require("./productRoutes");

app.get("/", (req, res) => {
  res.send("Hello, World!!");
});

app.use("/products", productRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
