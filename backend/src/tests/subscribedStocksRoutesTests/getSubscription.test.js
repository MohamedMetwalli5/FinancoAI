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

  describe('GET /subscribed-stocks/:email', () => {
    test('Should retrieve subscribed stocks for a user', async () => {
      const email = 'test@example.com';
      const mockSubscribedStocks = {
        email,
        subscribedstocks: ['AAPL', 'GOOGL'],
      };

      // Mocking the findOne method to return mockSubscribedStocks
      SubscribedStocks.findOne.mockResolvedValue(mockSubscribedStocks);

      const response = await request(app).get(`/subscribed-stocks/${email}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockSubscribedStocks);
      expect(SubscribedStocks.findOne).toHaveBeenCalledWith({ email });
    });


    test('Should create a new subscription document for a user with no stocks', async () => {
        const email = 'test@example.com';
    
        // Mocking the findOne method to return null (user has no stocks)
        SubscribedStocks.findOne.mockResolvedValue(null);
        
        // Defining the new subscription document
        const newSubscriptionDocument = {
            email,
            subscribedstocks: [],
            save: jest.fn().mockResolvedValue({
                email,
                subscribedstocks: []
            }), // Mocking save to return the new object structure
        };
    
        // Mocking the model constructor to return the outlined mock object
        SubscribedStocks.mockImplementation(() => newSubscriptionDocument);
        
        const response = await request(app).get(`/subscribed-stocks/${email}`);
    
        // Check expected output
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            email,
            subscribedstocks: []
        });
        expect(SubscribedStocks.findOne).toHaveBeenCalledWith({ email });
        expect(SubscribedStocks).toHaveBeenCalled(); // Checking if the model was instantiated
        expect(newSubscriptionDocument.save).toHaveBeenCalled(); // Checking if save was called
    });


    test('Should return 400 if there is an error fetching the subscribed stocks', async () => {
      const email = 'test@example.com';

      // Mocking the findOne method to throw an error
      SubscribedStocks.findOne.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get(`/subscribed-stocks/${email}`);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Database error' });
    });

  });
});