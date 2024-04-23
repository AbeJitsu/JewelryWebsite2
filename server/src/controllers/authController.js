// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/controllers/authController.js

const User = require("../models/userModel");
const validator = require("validator");
const {
  handleCartOnLogin,
  handleError,
  convertGuestCartToUserCart,
} = require("../util/authHelpers");

exports.register = async (req, res) => {
  const { email, password, preferredFirstName } = req.body;

  // Validate email format
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  // Ensure password meets length requirements
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
    // Convert guest cart to user cart upon successful registration
    await convertGuestCartToUserCart(req.sessionID, user._id);
    res
      .status(201)
      .json({ message: "Registration successful, please log in." });
  } catch (error) {
    handleError(res, error, "Registration error");
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

    // Handle session regeneration and cart handling
    req.session.regenerate(async (err) => {
      if (err) {
        handleError(res, err, "Session regeneration failed");
        return;
      }

      req.session.userId = user._id;
      // Handle any login cart operations
      await handleCartOnLogin(req, res, user._id);
    });
  } catch (error) {
    handleError(res, error, "Error during login");
  }
};

exports.logout = async (req, res) => {
  try {
    // Ensure session is destroyed and cookie is cleared
    req.session.destroy((err) => {
      if (err) {
        handleError(res, err, "Failed to destroy session during logout");
        return;
      }
      res.clearCookie("connect.sid", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      res.status(200).send({ message: "Logged out successfully" });
    });
  } catch (error) {
    handleError(res, error, "Logout failed");
  }
};
