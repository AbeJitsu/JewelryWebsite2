const request = require("supertest");
const app = require("../../server"); // Adjust the path according to your project structure

describe("Authentication Routes", () => {
  describe("POST /register", () => {
    it("should register a new user", async () => {
      const userData = {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      };
      const response = await request(app)
        .post("/register")
        .send(userData);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty(
        "message",
        "User registered successfully"
      );
      // Add more assertions as necessary
    });

    // Add more tests for error cases, like duplicate user
  });

  describe("POST /login", () => {
    it("should authenticate a user", async () => {
      const loginData = { email: "test@example.com", password: "password123" };
      const response = await request(app)
        .post("/login")
        .send(loginData);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("message", "Login successful");
      // Assert session cookie or other relevant checks
    });

    // Add tests for login failure scenarios
  });

  // Add tests for any other auth-related routes
});
