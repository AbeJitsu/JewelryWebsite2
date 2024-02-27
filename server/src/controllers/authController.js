// Users/abiezerreyes/Projects/JewelryWebsite2/server/src/controllers/authController.js

const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const { username, email, password, preferredFirstName } = req.body; // Include preferredFirstName in destructuring
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: "Email is already in use" });
    }
    // Include preferredFirstName when creating the user
    let user = new User({ username, email, password, preferredFirstName });
    await user.save();
    res.status(201).send({
      message: "User registered successfully",
      userId: user._id,
      username: user.username,
      preferredFirstName: user.preferredFirstName, // Return preferredFirstName in response
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send({
      error: error.message || "Internal server error during registration",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ error: "User not found" });
    }
    // Compare the hashed password with the one provided by the user
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ error: "Invalid email or password" });
    }
    // Optionally, initiate a session or generate a token here
    // req.session.userId = user._id;
    res.send({ message: "Login successful", userId: user._id });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ error: "Internal server error during login" });
  }
};
