//Users/abiezerreyes/Projects/JewelryWebsite2/server/src/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { errorMiddleware, asyncHandler, handleError } = require("../middleware/errorHandling");


router.post("/register", asyncHandler(authController.register));
router.post("/login", asyncHandler(authController.login));

router.post(
  "/logout",
  asyncHandler(async (req, res) => {
    await req.session.destroy();
    res.clearCookie("connect.sid", { path: "/", httpOnly: true, secure: true }); // Align cookie clearing with security settings
    res.status(200).send({ message: "Logged out successfully" });
  })
);

module.exports = router;
