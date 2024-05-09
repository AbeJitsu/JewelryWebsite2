// /Users/abiezerreyes/Documents/JewelryWebsite2/server/src/services/authService.js

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  generateToken: (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
  },

  verifyPassword: async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
  },

  hashPassword: async (password) => {
    return bcrypt.hash(password, 12);
  },
};
