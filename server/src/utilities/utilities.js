// utilities.js
const crypto = require("crypto");

const generateRandomBytes = (size = 12) => {
  return crypto.randomBytes(size).toString("hex");
};

module.exports = { generateRandomBytes };
