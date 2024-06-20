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

// In this example, the authRoutes.js file defines several routes for user authentication and authorization. The routes are protected using middleware functions that check for user authentication and role-based access control. The authMiddleware function checks if the user is authenticated, while the roleMiddleware function checks if the user has the required role to access certain routes.
