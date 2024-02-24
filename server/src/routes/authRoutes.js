// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/routes/authRoutes.js

const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send({ message: "Email already in use" });
    }
    // Create a new user instance. Password will be hashed automatically by the pre-save hook.
    let user = new User({ username, email, password });
    await user.save();
    req.session.userId = user._id; // Optionally store user ID in session
    res
      .status(201)
      .send({ message: "User registered successfully", userId: user._id });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .send({ error: "Internal server error during registration" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "Invalid credentials" });
    }
    // Use the comparePassword method to verify the user's password.
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid credentials" });
    }
    req.session.userId = user._id; // Optionally store user ID in session
    res
      .status(200)
      .send({ message: "Logged in successfully", userId: user._id });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ error: "Internal server error during login" });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res
        .status(500)
        .send({ message: "Could not log out, please try again" });
    }
    res.clearCookie("connect.sid"); // Clear session cookie
    res.status(200).send({ message: "Logged out successfully" });
  });
});

module.exports = router;
