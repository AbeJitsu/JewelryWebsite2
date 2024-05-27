// server / src / utilities / csvUtils.js;

// csvUtils.js
const Product = require("@/api/models/productModel");

function determineProductType(row) {
  const price = parseFloat(row["Variant Price"]);
  const description = row["Body (HTML)"].toLowerCase();
  if (price === 25) {
    return "zi";
  } else if (price === 20 || description.includes("fashion-fix")) {
    return "fashion-fix";
  }
  return "everyday";
}

module.exports = { determineProductType };
