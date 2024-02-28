// Users/abiezerreyes/Projects/JewelryWebsite2/server/src/controllers/authController.js

const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const validator = require("validator");

exports.register = async (req, res) => {
  try {
    const { email, password, preferredFirstName } = req.body;

    // Enhanced Input Validation
    if (!validator.isEmail(email)) {
      return res.status(400).send({ error: "Authentication error" });
    }
    console.log(`Password length received: ${password.length}`);
    if (!password || password.length < 8) {
      return res
        .status(400)
        .send({ error: "Password must be at least 8 characters long" });
    }

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: "Registration error" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let user = new User({
      email,
      password: hashedPassword,
      preferredFirstName,
    });

    await user.save();

    req.session.regenerate(function (err) {
      if (err) {
        console.error("Session regeneration error:", err);
        return res.status(500).send({ error: "Session regeneration failed" });
      }
      req.session.userId = user._id;
      // Configure session cookie settings assumed to be here
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
      return res.status(401).send({ error: "Authentication error" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ error: "Authentication error" });
    }

    req.session.regenerate(function (err) {
      if (err) {
        console.error("Session regeneration error:", err);
        return res.status(500).send({ error: "Session regeneration failed" });
      }
      req.session.userId = user._id;
      // Configure session cookie settings assumed to be here
      res.send({
        message: "Login successful",
        userId: user._id,
        preferredFirstName: user.preferredFirstName,
      });
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ error: "An error occurred during login" });
  }
};
