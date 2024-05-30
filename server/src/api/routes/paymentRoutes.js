// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/api/routes/paymentRoutes.js

const express = require("express");
const paymentController = require("../controllers/paymentController");
const router = express.Router();

router.post("/payment", paymentController.handlePayment);

module.exports = router;
