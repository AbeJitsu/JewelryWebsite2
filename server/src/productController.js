// productController.js

const express = require("express");
const router = express.Router();
const Product = require("./models/ProductModel");
const csvParser = require("csv-parser");
const fs = require("fs");

const color_keywords = [
    'red', 'blue', 'green', 'yellow', 'purple', 'pink', 'black', 'white', 'gold', 'silver', 'multi',
    'turquoise', 'opal', 'amber', 'marbled', 'teal', 'coral', 'navy', 'lavender', 'peach', 'mint',
    'rose gold', 'charcoal', 'ivory', 'bronze', 'pastel', 'neon', 'metallic', 'aquamarine', 'garnet',
    'citrine', 'peridot', 'magenta', 'olive', 'mauve', 'tan', 'indigo', 'violet', 'fuchsia', 'champagne',
    'sapphire', 'ruby', 'emerald', 'topaz', 'onyx', 'pearl', 'gunmetal', 'platinum', 'burgundy', 'lime', 'chocolate'
]; // Fill in your color keywords
const material_keywords = [
    'bead', 'metal', 'glass', 'crystal', 'wood', 'leather', 'stone', 'plastic', 'fabric',
    'rhinestone', 'sequin', 'enamel', 'lace', 'mesh', 'faux fur', 'velvet'
]; // Fill in your material keywords
const looks_keywords = [
    'pearl', 'oil spill', 'iridescent', 'pearlescent', 'glittered', 'foil'
]; // Fill in your looks keywords
const style_keywords = [
  "mermaid",
  "fringe",
  "tassel",
  "heart",
  "butterfly",
  "mandala",
  "shell",
  "crackle",
  "lightweight",
  "sapphire",
  "ruby",
  "emerald",
  "marquise",
  "hoop",
  "jacket",
  "cuff",
  "bangle",
  "stretch",
  "coil",
  "metallic",
  "crawler",
]; // Fill in your style keywords

// Function to extract keywords from product descriptions
function extractKeywordsFromDescription(description) {
  let colors = color_keywords.filter(keyword => description.toLowerCase().includes(keyword));
  let materials = material_keywords.filter(keyword => description.toLowerCase().includes(keyword));
  let looks = looks_keywords.filter(keyword => description.toLowerCase().includes(keyword));
  let styles = style_keywords.filter(keyword => description.toLowerCase().includes(keyword));

  return { colors, materials, looks, styles };
}


async function getProducts(req, res) {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to fetch products", error: error.message });
  }
}


async function addProduct(req, res) {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res
      .status(201)
      .send({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to add product", error: error.message });
  }
}

async function updateProduct(req, res) {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to update product", error: error.message });
  }
}
async function deleteProduct(req, res) {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to delete product", error: error.message });
  }
}

// Helper function to determine product type based on CSV row data
function determineProductType(row) {
  const price = Float(row["Variant Price"]);
  const description = row["Body (HTML)"].toLowerCase();
  return price === 25
    ? "zi"
    : price === 20 || description.includes("fashion-fix")
    ? "fashion-fix"
    : "everyday";
}

// Controller method to handle CSV file upload and parsing
async function uploadCSV(req, res) {
  if (!req.file) {
    return res.status(400).send({ message: "No CSV file uploaded." });
  }

  const filePath = req.file.path;
  const productsByHandle = {};

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on("data", (row) => {
      const handle = row["Handle"];
      if (handle) {
        productsByHandle[handle] = { ...row, type: determineProductType(row) };
      }
    })
    .on("end", async () => {
      try {
        const updatePromises = Object.values(productsByHandle).map(
          (productData) =>
            Product.findOneAndUpdate(
              { handle: productData.Handle },
              productData,
              { upsert: true, new: true }
            )
        );
        await Promise.all(updatePromises);
        res.json({ message: "CSV processed successfully." });
      } catch (error) {
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
}

// Advanced search with sorting and pagination
router.get('/search', async (req, res) => {
  const { query, sort = 'title', page = 1, pageSize = 10 } = req.query;
  const searchCriteria = buildSearchCriteria(query);
  const skipAmount = (page - 1) * pageSize;

  try {
    const products = await Product.find(searchCriteria)
                                   .sort({ [sort]: 1 })
                                   .skip(skipAmount)
                                   .limit(pageSize);

    res.json(products);
  } catch (error) {
    res.status(500).send({ message: "Error performing search", error: error.message });
  }
});

/**
 * Improved approach to build MongoDB search criteria based on a more complex query structure.
 * This function can now handle:

 * 1. Index-based text search for names and treatments like "pearl".
 * 2. Discover specs from explicit query properties - color, material, etc.
 * 3. Balance fluidity between naive and detailed data seeking.
 * 
 * @param {String} searchQuery The vanilla or full-featured search query from the app user.
 * @returns A criteria builder for exploring entries in the MongoDB database.
 */
function buildSearchCriteria(searchQuery) {
  let searchFragments = searchQuery.split(' ').filter(fragment => fragment.length);
  let dynamicFind = { $and: [] };
  
  searchFragments.forEach(fragment => {
    if (fragment.includes(':')) {
      let [key, value] = fragment.split(':');
      switch(key) {
        case 'color':
          dynamicFind.$and.push({ colors: { $regex: value, $options: 'i' } });
          break;
        case 'material':
          dynamicFind.$and.push({ materials: { $regex: value, $options: 'i' } });
          break;
        // Extend your code to manage other popular search choices.
        default:
          break;
      }
    } else {
      if (!dynamicFind.$or) dynamicFind.$or = [];
      dynamicFind.$or.push({ title: { $regex: fragment, $options: 'i' } });
      dynamicFind.$or.push({ colors: { $regex: fragment, $options: 'i' } });
      dynamicFind.$or.push({ materials: { $regex: fragment, $options: 'i' } });
      // Keep adding to this logic to involve more collection fields.
    }
  });

  if (!dynamicFind.$or?.length) delete dynamicFind.$or;
  if (!dynamicFind.$and?.length) delete dynamicFind.$and;

  return Object.keys(dynamicFind).length ? dynamicFind : {};
}

module.exports = { buildSearchCriteria };


// Export all functions as part of the module.exports object
module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  uploadCSV,
  buildSearchCriteria,
  router,
};

// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/productController.js
