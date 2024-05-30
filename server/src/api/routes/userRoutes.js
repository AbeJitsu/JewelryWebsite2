// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/api/routes/userRoutes.js

const express = require("express");
const asyncHandler = require("../middleware/errorHandling").asyncHandler;
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/register", asyncHandler(authController.register));
router.post("/login", asyncHandler(authController.login));

module.exports = router;
