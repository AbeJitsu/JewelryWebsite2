// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/routes/userRoutes.js

const express = require("express");
const router = express.Router();
// Correct import based on your project structure
const { registerUser } = require("../controllers/authController");

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await registerUser(username, email, password);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

module.exports = router;
