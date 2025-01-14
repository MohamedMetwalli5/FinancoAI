import request from "supertest";
import app from "../../server.js";
import User from "../../models/user.js";
import jwt from "jsonwebtoken";

jest.mock("../../models/user.js");
jest.mock("jsonwebtoken");

describe("User Routes", () => {
  test("PUT /users/:email - Update user info successfully", async () => {
    const mockUser = {
      _id: "123",
      email: "test@example.com",
      name: "John Doe",
      passwordHash: "hashedPassword123",
      preferences: {
        timezone: "UTC",
        emailNotifications: true,
      },
    };

    // Mocking the behavior of the findOneAndUpdate method
    User.findOneAndUpdate.mockResolvedValue({
      ...mockUser,
      name: "Jane Doe", // updated name
      preferences: {
        timezone: "EST", // updated timezone
        emailNotifications: false, // updated emailNotifications
      },
    });

    // Sending the update request
    const response = await request(app)
      .put("/users/test@example.com")
      .set("Authorization", "Bearer mock-token") // assuming authentication
      .send({
        name: "Jane Doe",
        passwordHash: "newHashedPassword123",
        timezone: "EST",
        emailNotifications: false,
      });

    // Expecting status 200 and the updated user info
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      _id: "123",
      email: "test@example.com",
      name: "Jane Doe",
      passwordHash: "hashedPassword123", // unchanged passwordHash
      preferences: {
        timezone: "EST",
        emailNotifications: false,
      },
    });
  });



  test("PUT /users/:email - User not found", async () => {
    // Mocking a scenario where no user is found
    User.findOneAndUpdate.mockResolvedValue(null);

    // Sending the update request
    const response = await request(app)
      .put("/users/notfound@example.com")
      .set("Authorization", "Bearer mock-token")
      .send({
        name: "Jane Doe",
        passwordHash: "newHashedPassword123",
        timezone: "EST",
        emailNotifications: false,
      });

    // Expecting status 404 and error message
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "User not found" });
  });


  
  test("PUT /users/:email - Invalid input data", async () => {
    const mockUser = {
      _id: "123",
      email: "test@example.com",
      passwordHash: "hashedPassword123",
      preferences: {
        timezone: "UTC",
        emailNotifications: true,
      },
    };

    // Mocking the behavior of the findOneAndUpdate method
    User.findOneAndUpdate.mockResolvedValue(mockUser);

    // Sending an update request with missing required fields
    const response = await request(app)
      .put("/users/test@example.com")
      .set("Authorization", "Bearer mock-token")
      .send({
        name: "", // empty name, invalid
        passwordHash: "newHashedPassword123",
        timezone: "EST",
        emailNotifications: false,
      });

    // Expecting status 400 and error message due to invalid input
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Invalid input data" });
  });
  
});
