import request from "supertest";
import app from "../../server.js";
import Tips from "../../models/tips.js";

jest.mock("../../models/tips.js");

jest.mock("../../middlewares/authMiddleware.js", () => {
  return jest.fn((req, res, next) => {
    req.user = { id: "123", email: "test@example.com" }; // Simulated user data
    next();
  });
});

describe("Tips Routes - GET /tips/:email", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });


  test("GET /tips/:email - Return all tips if no tips for current user", async () => {
    const email = "current-user@example.com";
    
    // Mocking an empty result for current user and a set of tips for others
    Tips.findOne.mockResolvedValue(null);
    Tips.find.mockResolvedValue([
      { id: "tip-1", email: "other-user@example.com", text: "Tip from another user." },
      { id: "tip-2", email: "another-user@example.com", text: "Another tip." },
    ]);

    const response = await request(app).get(`/tips/${email}`);

    // Expecting status 200 and all tips
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: "tip-1", email: "other-user@example.com", text: "Tip from another user." },
      { id: "tip-2", email: "another-user@example.com", text: "Another tip." },
    ]);
  });


  test("GET /tips/:email - Filter out the current user's tips", async () => {
    const email = "current-user@example.com";

    // Mocking an existing tip for the current user
    Tips.findOne.mockResolvedValue({ email });

    // Mock a set of tips including the current user's tips
    Tips.find.mockResolvedValue([
      { id: "tip-1", email: "current-user@example.com", text: "User's tip." },
      { id: "tip-2", email: "other-user@example.com", text: "Tip from another user." },
      { id: "tip-3", email: "another-user@example.com", text: "Another tip." },
    ]);

    const response = await request(app).get(`/tips/${email}`);

    // Expecting status 200 and tips without the current user's tip
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: "tip-2", email: "other-user@example.com", text: "Tip from another user." },
      { id: "tip-3", email: "another-user@example.com", text: "Another tip." },
    ]);
  });

  
  test("GET /tips/:email - Error during fetching tips", async () => {
    const email = "current-user@example.com";

    // Mocking an error during fetching
    Tips.findOne.mockRejectedValue(new Error("Failed to retrieve user's tips"));
    
    const response = await request(app).get(`/tips/${email}`);

    // Expecting status 400 and error message
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Failed to retrieve user's tips" });
  });
  
});