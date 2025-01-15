import request from 'supertest';
import app from '../../server.js';
import SubscribedStocks from '../../models/subscribed-stocks.js';


jest.mock('../../models/subscribed-stocks.js');

// Mocking the authenticateToken middleware
jest.mock('../../middlewares/authMiddleware.js', () => {
  return jest.fn((req, res, next) => {
    req.user = { email: 'test@example.com' };
    next();
  });
});


describe('Subscribed Stocks Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clearing mocks before each test to avoid leakage
  });

  describe('PUT /subscribed-stocks/:email', () => {
    test('Should update the subscribed stocks for a user', async () => {
      const email = 'test@example.com';
      const subscribedstocks = ['AAPL', 'AMZN'];

      const mockUpdatedStocks = {
        email: email,
        subscribedstocks: subscribedstocks,
      };

      // Mocking the findOneAndUpdate method to return mockUpdatedStocks
      SubscribedStocks.findOneAndUpdate.mockResolvedValue(mockUpdatedStocks);

      const response = await request(app).put(`/subscribed-stocks/${email}`).send({ subscribedstocks });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUpdatedStocks);
      expect(SubscribedStocks.findOneAndUpdate).toHaveBeenCalledWith(
        { email },
        { email, subscribedstocks: subscribedstocks },
        { new: true, upsert: true }
      );
    });


    test('Should return 400 if subscribed stocks is not provided', async () => {
      const email = 'test@example.com';

      const response = await request(app).put(`/subscribed-stocks/${email}`).send({});

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "Subscribed stocks must be a non-empty array." });
    });


    test('Should return 400 if subscribed stocks is not an array', async () => {
      const email = 'test@example.com';

      const response = await request(app).put(`/subscribed-stocks/${email}`).send({ subscribedstocks: 'not-an-array' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "Subscribed stocks must be a non-empty array." });
    });


    test('Should handle database errors', async () => {
      const email = 'test@example.com';
      const subscribedstocks = ['AAPL', 'HDSHYREWYREY'];

      // Mocking the findOneAndUpdate method to throw an error
      SubscribedStocks.findOneAndUpdate.mockRejectedValue(new Error('Database error'));

      const response = await request(app).put(`/subscribed-stocks/${email}`).send({ subscribedstocks });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Database error' });
    });

  });
});