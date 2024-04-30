const cartController = require("../../controllers/cartController");
const Cart = require("../../models/CartModel"); // Correct relative path
const mongoose = require("mongoose");

// Mocking mongoose methods used in getCartItems
jest.mock("../../models/CartModel", () => ({
  findOne: jest.fn().mockReturnValue({
    populate: jest.fn().mockResolvedValue({ items: [] }), // Simulate an empty cart
  }),
}));

describe("Cart Controller Tests", () => {
  const req = {
    session: { userId: "user123", sessionID: "testSession123" },
  };
  const res = {
    send: jest.fn(),
    status: jest.fn(() => res),
    json: jest.fn(),
  };

  test("getCartItems retrieves empty cart correctly", async () => {
    await cartController.getCartItems(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ items: [] });
  });
});
