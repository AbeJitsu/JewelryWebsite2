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
  let productsByHandle = {};

  fs.createReadStream(file)
    .pipe(csvParser())
    .on("data", (row) => {
      const handle = row["Handle"];
      if (!productsByHandle[handle]) {
        productsByHandle[handle] = {
          variantPrice: parseFloat(row["Variant Price"]) || 0,
          skus: [],
          imageSrcs: [],
        };
      }
      if (row["Variant SKU"])
        productsByHandle[handle].skus.push(row["Variant SKU"]);
      if (row["Image Src"])
        productsByHandle[handle].imageSrcs.push(row["Image Src"]);
    })
    .on("end", async () => {
      const updateInsertPromises = Object.keys(productsByHandle).map(
        async (handle) => {
          const productData = productsByHandle[handle];
          for (const sku of productData.skus) {
            await Product.findOneAndUpdate(
              { variantSKU: sku },
              {
                handle: handle,
                variantPrice: productData.variantPrice,
                imageSrcs: productData.imageSrcs,
              },
              { upsert: true, new: true }
            ).catch((err) => console.error("Update/Insert error:", err));
          }
        }
      );

      try {
        await Promise.all(updateInsertPromises);
        console.log("All products updated/inserted successfully.");
        fs.unlink(file, (err) => {
          if (err) console.error("Error removing the file:", err);
          else res.json({ message: "CSV processed successfully." });
        });
      } catch (error) {
        console.error("Error during database update/insert:", error);
        res
          .status(500)
          .send({ message: "Error processing products", error: error.message });
      }
    })
    .on("error", (err) => {
      res
        .status(500)
        .send({ message: "Error processing CSV", error: err.message });
    });
};

// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/productController.js
