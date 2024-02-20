// authController.js

const User = require("../models/User");

// Unified and optimized authentication controller

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ error: "Email is already in use" });
    }
    user = new User({ username, email, password });
    await user.save();
    // Initiate a session after successful registration
    req.session.userId = user._id;
    res
      .status(201)
      .send({ message: "User registered successfully", userId: user._id });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .send({ error: "Internal server error during registration" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ error: "User not found" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send({ error: "Invalid email or password" });
    }
    // Initiate a session after successful login
    req.session.userId = user._id;
    res.send({ message: "Login successful", userId: user._id });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ error: "Internal server error during login" });
  }
};
