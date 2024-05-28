// /Users/abiezerreyes/Documents/JewelryWebsite2/server/src/api/controllers/paymentController.js

const { processPayment } = require("@/services/paymentService");

exports.handlePayment = async (req, res) => {
  const { token, amount, currency } = req.body;
  if (!token || !amount || !currency) {
    return res
      .status(400)
      .json({ message: "Missing required payment details" });
  }

  try {
    const result = await processPayment(token, amount, currency);
    res.status(200).json({ message: "Payment successful", data: result });
  } catch (error) {
    console.error("Payment processing error:", error);
    res.status(500).json({ message: "Payment failed", error: error.message });
  }
};
