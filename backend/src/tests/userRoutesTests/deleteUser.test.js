import request from "supertest";
import app from "../../server.js";
import User from "../../models/user.js";
import Tips from "../../models/tips.js";
import SubscribedStocks from "../../models/subscribed-stocks.js";
import Transaction from "../../models/transaction.js";

jest.mock("../../models/user.js");
jest.mock("../../models/tips.js");
jest.mock("../../models/subscribed-stocks.js");
jest.mock("../../models/transaction.js");

// Mocking the authentication middleware
jest.mock("../../middlewares/authMiddleware.js", () => {
  return jest.fn((req, res, next) => {
    // Mocking the user is authenticated by adding user info to the request
    req.user = { id: "123", email: "test@example.com" }; // Simulated user data
    next();
  });
});

describe("User Routes - DELETE /users/:email", () => {
  test("DELETE /users/:email - Successfully delete user and related data", async () => {
    const mockUser = {
      _id: "123",
      email: "test@example.com",
      passwordHash: "hashedPassword123",
      preferences: {
        timezone: "UTC",
        emailNotifications: true,
      },
    };

    // Mocking the behavior of User, Tips, SubscribedStocks, and Transaction models
    User.findOne.mockResolvedValue(mockUser);
    User.deleteOne.mockResolvedValue({});
    Tips.findOne.mockResolvedValue({ email: "test@example.com" });
    Tips.deleteMany.mockResolvedValue({});
    SubscribedStocks.findOne.mockResolvedValue({ email: "test@example.com" });
    SubscribedStocks.deleteMany.mockResolvedValue({});
    Transaction.findOne.mockResolvedValue({ email: "test@example.com" });
    Transaction.deleteMany.mockResolvedValue({});

    const response = await request(app)
      .delete("/users/test@example.com")
      .set("Authorization", "Bearer mock-token");

    // Expecting status 200 and success message
    expect(response.status).toBe(200);
    expect(response.text).toBe("User is Deleted Successfully");
  });

  
  test("DELETE /users/:email - User not found", async () => {
    // Mocking that no user is found for the email
    User.findOne.mockResolvedValue(null);

    const response = await request(app)
      .delete("/users/notfound@example.com")
      .set("Authorization", "Bearer mock-token");

    // Expecting status 404 and error message
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "User not found" });
  });


  test("DELETE /users/:email - Error during deletion", async () => {
    const mockUser = {
      _id: "123",
      email: "test@example.com",
      passwordHash: "hashedPassword123",
      preferences: {
        timezone: "UTC",
        emailNotifications: true,
      },
    };

    // Mocking the behavior of User.findOne returning the user
    User.findOne.mockResolvedValue(mockUser);
    // Mocking an error during deletion
    User.deleteOne.mockRejectedValue(new Error("Failed to delete user"));

    const response = await request(app)
      .delete("/users/test@example.com")
      .set("Authorization", "Bearer mock-token");

    // Expecting status 400 and error message
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Failed to delete user" });
  });

});