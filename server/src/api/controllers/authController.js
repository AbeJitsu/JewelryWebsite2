// /Users/abiezerreyes/Documents/JewelryWebsite2/server/src/api/controllers/authController.js

require("module-alias/register");

const validator = require("validator");
const authService = require("@/services/authService");
// /Users/abiezerreyes/Documents/JewelryWebsite2/server/src/services/authService.js
const userService = require("@/services/userService");
const Cart = require("@/api/models/CartModel");

exports.register = async (req, res) => {
  try {
    const { email, password, preferredFirstName } = req.body;
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters long" });
    }
    const existingUser = await userService.getUserById(email);
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = await authService.hashPassword(password);
    const newUser = await userService.createUser({
      email,
      password: hashedPassword,
      preferredFirstName,
    });
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
    const user = await userService.getUserById(email);
    if (!user || !(await authService.verifyPassword(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    req.session.regenerate(async (err) => {
      if (err) {
        console.error("Session regeneration error:", err);
        return res.status(500).json({ error: "Session regeneration failed" });
      }
      req.session.userId = user._id;
      const guestCartExists = await Cart.findOne({
        sessionToken: req.sessionID,
      });
      if (guestCartExists) {
        await Cart.convertGuestCartToUserCart(req.sessionID, user._id).catch(
          (error) => console.error("Cart merge error:", error)
        );
      }
      res.json({
        message: "Login successful",
        userId: user._id,
        preferredFirstName: user.preferredFirstName,
      });
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "An internal error occurred during login" });
  }
};
