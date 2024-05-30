// server/src/services/authService.js

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  generateToken: (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
  },

  verifyToken: (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return reject(err);
        resolve(decoded);
      });
    });
  },

  verifyPassword: async (password, hashedPassword) => {
    console.log("Password being verified:", password);
    console.log("Hashed password:", hashedPassword);
    return bcrypt.compare(password, hashedPassword);
  },

  hashPassword: async (password) => {
    console.log("Password being hashed:", password);
    return bcrypt.hash(password, 12);
  },
};
