// Users/abiezerreyes/Projects/JewelryWebsite2/server/src/controllers/authController.js

const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const { email, password, preferredFirstName } = req.body;
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: "Email is already in use" });
    }

    // Hash the password before saving the user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let user = new User({
      email,
      password: hashedPassword, // Save the hashed password
      preferredFirstName,
    });

    await user.save();

    // If using sessions, establish session here. Assuming session middleware is configured.
    req.session.userId = user._id; // Store user ID in session

    res.status(201).send({
      message: "User registered successfully",
      userId: user._id,
      preferredFirstName: user.preferredFirstName,
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
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ error: "Invalid email or password" });
    }

    // If using sessions, establish session here. Assuming session middleware is configured.
    req.session.userId = user._id; // Store user ID in session

    res.send({
      message: "Login successful",
      userId: user._id,
      preferredFirstName: user.preferredFirstName, // Consider sending back preferredFirstName for client-side greeting or usage
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ error: "Internal server error during login" });
  }
};
