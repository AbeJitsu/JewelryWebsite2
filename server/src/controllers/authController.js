const User = require("../models/userModel");
const validator = require("validator");
const Cart = require("../models/CartModel"); // Ensure Cart model is imported

exports.register = async (req, res) => {
  try {
    const { email, password, preferredFirstName } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).send({ error: "Invalid email format" });
    }
    if (!password || password.length < 8) {
      return res
        .status(400)
        .send({ error: "Password must be at least 8 characters long" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: "User already exists" });
    }

    const user = new User({
      email,
      password,
      preferredFirstName,
    });

    await user.save();
    // Responding with success message, removed setting session userId here
    res.status(201).send({
      message: "User registered successfully. Please log in.",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send({ error: "An error occurred during registration" });
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
      return res.status(401).send({ error: "Invalid credentials" });
    }

    req.session.regenerate(async (err) => {
      if (err) {
        console.error("Session regeneration error:", err);
        return res.status(500).send({ error: "Session regeneration failed" });
      }

      req.session.userId = user._id;
      console.log("User ID set in session:", req.session.userId); // Added logging

      // Check for the existence of a guest cart before initiating the merge
      const guestCartExists = await Cart.findOne({
        sessionToken: req.sessionID,
      });
      if (guestCartExists) {
        Cart.convertGuestCartToUserCart(req.sessionID, user._id)
          .then(() => console.log("Cart merge completed"))
          .catch((error) => console.error("Cart merge error:", error)); // Error is logged silently
      }

      // Respond to the client without waiting for the cart merge
      res.send({
        message: "Login successful",
        userId: user._id,
        preferredFirstName: user.preferredFirstName,
      });
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ error: "An internal error occurred during login" });
  }
};

