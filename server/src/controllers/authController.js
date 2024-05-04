// src/controllers/authController.js

const User = require("../models/userModel");
const validator = require("validator");
const Cart = require("../models/CartModel");

exports.register = async (req, res) => {
  try {
    const { email, password, preferredFirstName } = req.body;

    // Validate input
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    if (!password || password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters long" });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create new user
    const user = new User({ email, password, preferredFirstName });
    await user.save();

    // Response on successful registration
    res
      .status(201)
      .json({ message: "User registered successfully. Please log in." });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "An error occurred during registration" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Regenerate the session
    req.session.regenerate(async (err) => {
      if (err) {
        console.error("Session regeneration error:", err);
        return res.status(500).json({ error: "Session regeneration failed" });
      }

      req.session.userId = user._id;

      // Check for and merge guest cart
      const guestCartExists = await Cart.findOne({
        sessionToken: req.sessionID,
      });
      if (guestCartExists) {
        await Cart.convertGuestCartToUserCart(req.sessionID, user._id).catch(
          (error) => console.error("Cart merge error:", error)
        );
      }

      // Respond to client
      res.json({ message: "Login successful", userId: user._id, preferredFirstName: user.preferredFirstName});
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "An internal error occurred during login" });
  }
};
