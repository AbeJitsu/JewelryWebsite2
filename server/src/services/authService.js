// server/src/services/authService.js

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  generateToken: (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "30d",
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

  verifyPassword: async (plaintextPassword, hashedPassword) => {
    console.log("Plaintext password:", plaintextPassword);
    console.log("Hashed password:", hashedPassword);
    return bcrypt.compare(plaintextPassword, hashedPassword);
  },

  hashPassword: async (password) => {
    console.log("Password being hashed:", password);
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(password, salt);
  },
};
