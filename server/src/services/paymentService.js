// /Users/abiezerreyes/Documents/JewelryWebsite2/server/src/services/paymentService.js

const { Client, Environment } = require("square");
const crypto = require("crypto");

const squareClient = new Client({
  environment:
    process.env.NODE_ENV === "production"
      ? Environment.Production
      : Environment.Sandbox,
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

exports.processPayment = async (token, amount, currency) => {
  try {
    const idempotencyKey = crypto.randomBytes(12).toString("hex");
    const { result } = await squareClient.paymentsApi.createPayment({
      sourceId: token,
      amountMoney: { amount: Math.round(amount * 100), currency },
      idempotencyKey,
    });
    return { success: true, data: result.payment };
  } catch (error) {
    console.error("Payment processing error:", error);
    throw error; // Rethrowing the error to be handled by the caller
  }
};
