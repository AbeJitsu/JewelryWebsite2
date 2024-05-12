// /Users/abiezerreyes/Documents/JewelryWebsite2/server/src/utilities/keywordExtraction.js

// Define keyword arrays for various product attributes
const colorKeywords = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "pink",
  "black",
  "white",
  "gold",
  "silver",
  "multi",
  "turquoise",
  "opal",
  "amber",
  "marbled",
  "teal",
  "coral",
  "navy",
  "lavender",
  "peach",
  "mint",
  "rose gold",
  "charcoal",
  "ivory",
  "bronze",
  "pastel",
  "neon",
  "metallic",
  "aquamarine",
  "garnet",
  "citrine",
  "peridot",
  "magenta",
  "olive",
  "mauve",
  "tan",
  "indigo",
  "violet",
  "fuchsia",
  "champagne",
  "sapphire",
  "ruby",
  "emerald",
  "topaz",
  "onyx",
  "pearl",
  "gunmetal",
  "platinum",
  "burgundy",
  "lime",
  "chocolate",
];

const materialKeywords = [
  "bead",
  "metal",
  "glass",
  "crystal",
  "wood",
  "leather",
  "stone",
  "plastic",
  "fabric",
  "rhinestone",
  "sequin",
  "enamel",
  "lace",
  "mesh",
  "faux fur",
  "velvet",
];

const looksKeywords = [
  "pearl",
  "oil spill",
  "iridescent",
  "pearlescent",
  "glittered",
  "foil",
];

const styleKeywords = [
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
];

// Function to extract keywords from a given description
function extractKeywordsFromDescription(description) {
  let colors = colorKeywords.filter((keyword) =>
    description.toLowerCase().includes(keyword)
  );
  let materials = materialKeywords.filter((keyword) =>
    description.toLowerCase().includes(keyword)
  );
  let looks = looksKeywords.filter((keyword) =>
    description.toLowerCase().includes(keyword)
  );
  let styles = styleKeywords.filter((keyword) =>
    description.toLowerCase().includes(keyword)
  );

  return { colors, materials, looks, styles };
}

module.exports = {
  extractKeywordsFromDescription,
};
