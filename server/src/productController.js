// productController.js

// Mock database array for illustration
let products = [
  { id: 1, name: "Product 1", price: 100 },
  { id: 2, name: "Product 2", price: 150 },
];

// Get all products
exports.getProducts = (req, res) => {
  res.json(products);
};

// Add a new product
exports.addProduct = (req, res) => {
  const newProduct = { ...req.body, id: products.length + 1 };
  products.push(newProduct);
  console.log(newProduct);
  res.status(201).send(newProduct);
};

// Update a product by ID
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  let productFound = false;
  products = products.map((product) => {
    if (product.id.toString() === id) {
      productFound = true;
      return { ...product, name, price };
    }
    return product;
  });

  if (productFound) {
    res.send({ message: "Product updated successfully" });
  } else {
    res.status(404).send({ message: "Product not found" });
  }
};

// Delete a product by ID
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  const initialLength = products.length;
  products = products.filter((product) => product.id.toString() !== id);

  if (products.length < initialLength) {
    res.send({ message: "Product deleted successfully" });
  } else {
    res.status(404).send({ message: "Product not found" });
  }
};
