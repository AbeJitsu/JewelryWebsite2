// server/src/api/controllers/authController.js
const authService = require("../../services/authService");
const userService = require("../../services/userService");
const Cart = require("../../services/cartService");
const validator = require("validator");

exports.register = async (req, res) => {
  const { email, password, preferredFirstName } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password must be at least 8 characters long" });
  }

  try {
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    console.log("Plain password before hashing:", password);
    const hashedPassword = await authService.hashPassword(password);
    console.log("Hashed password during registration:", hashedPassword);

    const user = await userService.createUser({
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
  const { email, password } = req.body;

  try {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      console.log("User not found for email:", email);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await authService.verifyPassword(
      password,
      user.password
    );
    console.log("Password validation result:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("Invalid credentials for email:", email);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = authService.generateToken(user);
    req.session.user_id = user._id;

    const guestCartConversion = await Cart.convertGuestCartToUserCart(
      req.sessionID,
      user._id
    );

    res.status(200).json({
      message: "Login successful",
      user_id: user._id,
      token,
      preferredFirstName: user.preferredFirstName,
      role: user.role,
      guestCartConversion,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "An internal error occurred during login" });
  }
};

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

exports.getUserProfile = async (req, res) => {
  const { user_id } = req.session;

  try {
    const user = await userService.getUserById(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({
      email: user.email,
      preferredFirstName: user.preferredFirstName,
      role: user.role,
      token: req.token,
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
  getUserProfile: exports.getUserProfile,
};
