const express = require("express");
const router = express.Router();
const { handlePayment } = require("../controllers/paymentController");

router.post("/", handlePayment);

module.exports = router;
