// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/api/controllers/authController.js

const authService = require("@/services/authService");
const userService = require("@/services/userService");
const Cart = require("@/api/models/cartModel");
const validator = require("validator");

// User registration
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

    const existingUser = await userService.getUserByEmail(email);
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

// User login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.getUserByEmail(email);

    if (!user || !(await authService.verifyPassword(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    req.session.regenerate(async (err) => {
      if (err) {
        console.error("Session regeneration error:", err);
        return res.status(500).json({ error: "Session regeneration failed" });
      }

      req.session.userId = user._id;
      console.log("Session ID after login:", req.sessionID);
      console.log("User ID after login:", req.session.userId);

      try {
        await Cart.convertGuestCartToUserCart(req.sessionID, user._id);
      } catch (mergeError) {
        console.error("Cart merge error:", mergeError);
      }

      res.json({
        message: "Login successful",
        userId: user._id,
        preferredFirstName: user.preferredFirstName,
        token: authService.generateToken(user),
      });
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "An internal error occurred during login" });
  }
};

// User logout
exports.logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res
        .status(500)
        .json({ error: "Failed to log out, please try again" });
    }
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logged out successfully" });
  });
};

// Get user profile
exports.getUser = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await userService.getUserById(req.session.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      email: user.email,
      preferredFirstName: user.preferredFirstName,
      role: user.role,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "An internal error occurred" });
  }
};

module.exports = {
  register: exports.register,
  login: exports.login,
  logout: exports.logout,
  getUser: exports.getUser,
};
