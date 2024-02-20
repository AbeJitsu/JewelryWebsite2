// authRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/userModel"); // Adjusted path

const bcrypt = require("bcryptjs");

// Adjust the path as necessary. Assuming User model has a comparePassword method.
router.post("/auth/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    req.session.userId = user._id; // Store user ID in session
    return res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).send({ message: "Error registering user" });
  }
});

router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const isMatch = user && (await user.comparePassword(password));

  if (isMatch) {
    req.session.userId = user._id; // Store user ID in session
    return res.status(200).send({ message: "Logged in successfully" });
  } else {
    return res.status(401).send({ message: "Invalid credentials" });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .send({ message: "Could not log out, please try again" });
    }
    res.clearCookie("connect.sid"); // The name of the cookie used for session middleware
    return res.status(200).send({ message: "Logged out successfully" });
  });
});

module.exports = router;
