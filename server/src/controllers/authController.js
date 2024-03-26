const User = require("../models/userModel");
const validator = require("validator");

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

    req.session.regenerate((err) => {
      if (err) {
        console.error("Session regeneration error:", err);
        return res.status(500).send({ error: "Session regeneration failed" });
      }
      req.session.userId = user._id;
      res.status(201).send({
        message: "User registered successfully",
        userId: user._id,
        preferredFirstName: user.preferredFirstName,
      });
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

      // Start the cart merge process in the background
      Cart.convertGuestCartToUserCart(req.sessionID, user._id)
        .then(() => console.log("Cart merge completed"))
        .catch((error) => console.error("Cart merge error:", error));

      // Respond to the client immediately without waiting for the cart merge
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