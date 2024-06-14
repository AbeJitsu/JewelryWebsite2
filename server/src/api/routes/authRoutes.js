// server/src/api/routes/authRoutes.js

const express = require("express");
const authController = require("../controllers/authController");
const {
  authMiddleware,
  roleMiddleware,
} = require("../middleware/auth/authMiddleware");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/user", authMiddleware, authController.getUserProfile);

// Route to change user role
router.post(
  "/change-role",
  authMiddleware,
  roleMiddleware(["admin"]),
  authController.changeUserRole
);

// Example route with role-based access control
router.get("/admin", authMiddleware, roleMiddleware(["admin"]), (req, res) => {
  res.status(200).json({ message: "Admin access granted" });
});

module.exports = router;
