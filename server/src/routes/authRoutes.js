// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/routes/authRoutes.js
const express = require("express");
const router = express.Router();
// Import the authController
const authController = require("../controllers/authController");

// Use the controller's register function for the /register route
router.post("/register", authController.register);

// Use the controller's login function for the /login route
router.post("/login", authController.login);

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res
        .status(500)
        .send({ message: "Could not log out, please try again" });
    }
    res.clearCookie("connect.sid"); // Clear session cookie
    res.status(200).send({ message: "Logged out successfully" });
  });
});

module.exports = router;
