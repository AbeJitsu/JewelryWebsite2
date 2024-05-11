// /Users/abiezerreyes/Documents/JewelryWebsite2/server/src/api/routes/paymentRoute.js

const express = require("express");
const { handlePayment } = require("../controllers/paymentController");
const router = express.Router();

router.post("/", handlePayment);

module.exports = router;
