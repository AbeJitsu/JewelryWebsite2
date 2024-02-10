const Product = require("./models/ProductModel");
const csvParser = require("csv-parser");
const fs = require("fs");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error fetching products", error: err.message });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error adding product", error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error updating product", error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.send({ message: "Product deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error deleting product", error: err.message });
  }
};

exports.uploadCSV = async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: "No CSV file uploaded." });
  }

  const file = req.file.path;
  const quantities = JSON.parse(req.body.quantities || "{}");

  fs.createReadStream(file)
    .pipe(csvParser())
    .on("data", async (row) => {
      const code = row.code; // Adapt 'code' based on your CSV structure
      if (quantities[code]) {
        row.quantity = quantities[code];
      }
      await Product.findOneAndUpdate({ code }, row, {
        upsert: true,
        new: true,
      });
    })
    .on("end", () => {
      fs.unlink(file, (err) => {
        if (err) console.error("Error removing the file:", err);
      });
      res.json({ message: "CSV processed successfully." });
    })
    .on("error", (err) => {
      res
        .status(500)
        .send({ message: "Error processing CSV", error: err.message });
    });
};
