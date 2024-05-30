// src/api/routes/authRoutes.js

const express = require("express");
const authController = require("../controllers/authController");
const { authMiddleware } = require("../middleware/auth/authMiddleware");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/user", authMiddleware, authController.getUser);

module.exports = router;
