// server / src / utilities / csvUtils.js;

function determineProductType(row) {
  const price = parseFloat(row["Variant Price"]);
  const description = row["Body (HTML)"].toLowerCase();

  if (price === 25) {
    return "zi";
  } else if (price === 20 || description.includes("fashion fix")) {
    return "fashion-fix";
  } else {
    return "everyday-glam";
  }
}

module.exports = { determineProductType };
