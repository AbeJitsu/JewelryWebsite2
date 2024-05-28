// /Users/abiezerreyes/Documents/JewelryWebsite2/server/src/services/paymentService.js

const { Client, Environment } = require("square");
const crypto = require("crypto");

const client = new Client({
  environment:
    process.env.SQUARE_ENVIRONMENT === "production"
      ? Environment.Production
      : Environment.Sandbox,
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

exports.processPayment = async (token, amount, currency) => {
  const idempotencyKey = crypto.randomBytes(12).toString("hex");
  const paymentMoney = {
    amount: Math.round(amount * 100), // Square API expects amount in cents
    currency,
  };

  try {
    const { result } = await client.paymentsApi.createPayment({
      sourceId: token,
      idempotencyKey,
      amountMoney: paymentMoney,
    });
    return result;
  } catch (error) {
    console.error("Payment processing error:", error);
    throw error;
  }
};
