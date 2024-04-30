const cartController = require("../../controllers/cartController");

// Mocking req and res objects for comprehensive testing
const req = {
  body: {
    productId: "12345",
    quantity: 1,
  },
  session: { userId: "testUser123", sessionID: "testSession123" },
};
const res = {
  send: jest.fn(),
  status: jest.fn(() => res),
  json: jest.fn(),
};

describe("Cart Controller Tests", () => {
  const req = {
    body: {
      productId: "12345",
      quantity: 1,
    },
    session: { userId: "user123" },
  };
  const res = {
    send: jest.fn(),
    status: jest.fn(() => res),
  };

  test("addItemToCart adds item correctly", async () => {
    await cartController.addItemToCart(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });

  test("addItemToCart handles errors", async () => {
    req.body.quantity = 0; // Invalid quantity to trigger an error
    await cartController.addItemToCart(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});