// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/controllers/authController.js

const User = require("../models/userModel");
const validator = require("validator");
const Cart = require("../models/CartModel");

exports.register = async (req, res) => {
  const { email, password, preferredFirstName } = req.body;
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  if (!password || password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password must be at least 8 characters long" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already in use" });
    }
    const user = new User({ email, password, preferredFirstName });
    await user.save();
    res
      .status(201)
      .json({ message: "Registration successful, please log in." });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "An error occurred during registration" });
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

      try {
        const userCart = await Cart.findOne({ user: user._id });
        const guestCart = await Cart.findOne({ sessionToken: req.sessionID });

        if (guestCart) {
          if (userCart) {
            // Merge items from guest cart into user cart
            userCart.items = [...userCart.items, ...guestCart.items]; // Adjust based on your item schema
            await userCart.save();
            await guestCart.remove(); // Remove guest cart after merging
          } else {
            // Assign guest cart to user if no user cart exists
            guestCart.user = user._id;
            guestCart.sessionToken = null;
            await guestCart.save();
          }
        }

        res.send({
          message: "Login successful",
          userId: user._id,
          preferredFirstName: user.preferredFirstName,
          cart: userCart ? userCart : guestCart, // Send back the appropriate cart
        });
      } catch (cartError) {
        console.error("Cart handling error:", cartError);
        res.status(500).send({ error: "Error processing cart information" });
      }
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ error: "An internal error occurred during login" });
  }
};

// Optional: Definition of the Cart conversion function, if applicable
async function convertGuestCartToUserCart(sessionID, userID) {
  const guestCart = await Cart.findOne({ sessionToken: sessionID });
  if (guestCart) {
    try {
      // Convert or merge guest cart to user cart logic
      guestCart.user = userID;
      guestCart.sessionToken = null;
      await guestCart.save();
      console.log("Cart merge completed");
    } catch (error) {
      console.error("Cart merge error:", error);
    }
  }
}
