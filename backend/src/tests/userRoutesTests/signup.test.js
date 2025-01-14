import request from "supertest";
import app from "../../server.js";
import User from "../../models/user.js";
import jwt from "jsonwebtoken";

jest.mock("../../models/user.js");
jest.mock("jsonwebtoken");

describe("User Signup Route", () => {
  test("POST /users/signup - Successful signup", async () => {
    const mockNewUser = {
      _id: "123",
      email: "test@example.com",
      passwordHash: "hashedPassword123",
      preferences: {
        timezone: "UTC",
        emailNotifications: true,
      },
    };

    // Mocking the behavior of User.create and generateToken
    User.create.mockResolvedValue(mockNewUser);
    jwt.sign.mockReturnValue("mocked-token");

    const response = await request(app)
      .post("/users/signup")
      .send({
        email: "test@example.com",
        passwordHash: "hashedPassword123",
        name: "Test User",
        preferences: {
          timezone: "UTC",
          emailNotifications: true,
        },
      });

    // Expecting status 201 and the generated token
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ token: "mocked-token" });
  });


  test("POST /users/signup - User already exists", async () => {
    // Mocking that the email is already in the system
    User.create.mockRejectedValue(new Error("User already exists"));

    const response = await request(app)
      .post("/users/signup")
      .send({
        email: "test@example.com",
        passwordHash: "hashedPassword123",
        name: "Test User",
        preferences: {
          timezone: "UTC",
          emailNotifications: true,
        },
      });

    // Expecting status 400 and error message for already existing user
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "User already exists" });
  });


  test("POST /users/signup - Invalid input data", async () => {
    const response = await request(app)
      .post("/users/signup")
      .send({
        email: "", // Invalid email
        passwordHash: "", // Invalid passwordHash
        name: "Test User",
        preferences: {
          timezone: "UTC",
          emailNotifications: true,
        },
      });

    // Expecting status 400 and error message for invalid data
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Invalid input data" });
  });
  
});
