import request from "supertest";
import app from "../../server.js";
import User from "../../models/user.js";
import jwt from "jsonwebtoken";

jest.mock("../../models/user.js");
jest.mock("jsonwebtoken");

describe("User Routes", () => {
  test("POST /users/signin - Valid user", async () => {
    const mockUser = {
      _id: "123",
      email: "test@example.com",
      passwordHash: "hashedPassword123",
    };

    User.findOne.mockResolvedValue(mockUser);
    jwt.sign.mockReturnValue("mocked-token");

    const response = await request(app)
      .post("/users/signin")
      .send({ email: "test@example.com", password: "hashedPassword123" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ token: "mocked-token" });
  });


  test("POST /users/signin - User not found", async () => {
    User.findOne.mockResolvedValue(null);

    const response = await request(app)
      .post("/users/signin")
      .send({ email: "notfound@example.com", password: "somePassword" });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "User not found" });
  });


  test("POST /users/signin - Invalid credentials", async () => {
    const mockUser = {
      _id: "123",
      email: "test@example.com",
      passwordHash: "hashedPassword123",
    };

    User.findOne.mockResolvedValue(mockUser);

    const response = await request(app)
      .post("/users/signin")
      .send({ email: "test@example.com", password: "wrongPassword" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Invalid credentials" });
  });
  
});
