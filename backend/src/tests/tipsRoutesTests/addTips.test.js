import request from "supertest";
import app from "../../server.js";
import Tips from "../../models/tips.js";


jest.mock("../../models/tips.js");

// Mocking the authentication middleware
jest.mock("../../middlewares/authMiddleware.js", () => {
  return jest.fn((req, res, next) => {
    req.user = { id: "123", email: "test@example.com" }; // Simulated user data
    next();
  });
});

describe("Tips Routes - POST /tips", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  test("POST /tips - Successfully create a new tip", async () => {
    const newTipData = {
      email: "test@example.com",
      text: "This is a new tip.",
    };

    // Set up the mock to return the newly created tip
    const mockTip = { ...newTipData, id: "mock-uuid" };
    Tips.create.mockResolvedValue(mockTip);

    const response = await request(app)
      .post("/tips")
      .send(newTipData)
      .set("Authorization", "Bearer mock-token");

    // Expecting status 201 and the created tip data
    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockTip);
  });
  

  test("POST /tips - Validation error due to missing fields", async () => {
    const invalidTipData = { email: "" }; // Invalid as 'text' is missing

    const response = await request(app)
      .post("/tips")
      .send(invalidTipData)
      .set("Authorization", "Bearer mock-token");

    // Expecting status 400 and an error message about validation
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: expect.any(String) });
  });


  test("POST /tips - Error during tip creation", async () => {
    const newTipData = {
      email: "test@example.com",
      text: "This is a new tip.",
    };

    // Mocking an error during Tips.create
    Tips.create.mockRejectedValue(new Error("Failed to create tip"));

    const response = await request(app)
      .post("/tips")
      .send(newTipData)
      .set("Authorization", "Bearer mock-token");

    // Expecting status 400 and error message
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Failed to create tip" });
  });
});
