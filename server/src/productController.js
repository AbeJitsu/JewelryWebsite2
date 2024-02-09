// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/productController.js
const Product = require("./models/ProductModel"); // Update the path to where your ProductModel is located

// Get all products
exports.getProducts = (req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) =>
      res.status(500).json({ message: "Error fetching products", error: err })
    );
};

// Add a new product
exports.addProduct = (req, res) => {
  const newProduct = new Product(req.body);
  newProduct
    .save()
    .then((doc) => res.status(201).json(doc))
    .catch((err) =>
      res.status(500).json({ message: "Error adding product", error: err })
    );
};

// Update a product by ID
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  Product.findByIdAndUpdate(id, req.body, { new: true })
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    })
    .catch((err) =>
      res.status(500).json({ message: "Error updating product", error: err })
    );
};

// Delete a product by ID
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  Product.findByIdAndRemove(id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product deleted successfully" });
    })
    .catch((err) =>
      res.status(500).json({ message: "Error deleting product", error: err })
    );
};
