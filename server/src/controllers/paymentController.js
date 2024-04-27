// controllers/paymentController.js
const { processPayment } = require("../services/paymentService");

const handlePayment = async (req, res) => {
  const { token, amount, currency } = req.body;
  if (!token || !amount || !currency) {
    return res
      .status(400)
      .json({ message: "Missing required payment details" });
  }

  try {
    const result = await processPayment(token, amount, currency);
    if (result.success) {
      res.json({ message: "Payment successful", data: result.data });
    } else {
      res
        .status(400)
        .json({ message: "Payment failed", errors: result.data.errors });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { handlePayment };
