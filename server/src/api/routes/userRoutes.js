// /Users/abiezerreyes/Documents/JewelryWebsite2/server/src/api/routes/userRoutes.js

const express = require("express");
const router = express.Router();
// Correct import based on your project structure
const { register, login } = require("../controllers/authController"); // Assuming you have a login function as well

router.post("/register", async (req, res) => {
  const { email, password, preferredFirstName } = req.body;
  try {
    // Directly use the register function exported from authController
    await register(req, res);
    // Since response handling is done inside the register function, no need to duplicate here
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

// Assuming you want a login route as well
router.post("/login", async (req, res) => {
  try {
    // Directly use the login function exported from authController
    await login(req, res);
    // Since response handling is done inside the login function, no need to duplicate here
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

module.exports = router;
