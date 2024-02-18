// authRoutes.js
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// User login route
router.post("/login", (req, res) => {
  // Here, you would typically validate user credentials against your database
  // For demonstration, assuming credentials are valid
  const user = { id: 1, username: "testUser" }; // Example user object

  // Generate a JWT
  const token = jwt.sign({ user: user.id }, "YOUR_SECRET_KEY", {
    expiresIn: "1h",
  });

  res.json({ token, user });
});

module.exports = router;
