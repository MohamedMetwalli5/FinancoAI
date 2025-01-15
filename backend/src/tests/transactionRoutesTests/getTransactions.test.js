import request from 'supertest';
import app from '../../server.js';
import Transaction from '../../models/transaction.js';


jest.mock('../../models/transaction.js');

// Mocking the authenticateToken middleware
jest.mock('../../middlewares/authMiddleware.js', () => {
  return jest.fn((req, res, next) => {
    req.user = { email: 'test@example.com' };
    next();
  });
});


describe('Transaction Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clearing mocks before each test to avoid leakage
  });

  describe('GET /transactions/:email', () => {
    test('Should retrieve transactions for a user', async () => {
      const email = 'test@example.com';
      const mockTransactions = [
        {
          id: 'transaction-1',
          category: 'Food',
          amount: 100,
          description: 'Test transaction 1',
          date: new Date().toISOString(),
          recurring: false,
          email: email,
        },
        {
          id: 'transaction-2',
          category: 'Transport',
          amount: 50,
          description: 'Test transaction 2',
          date: new Date().toISOString(),
          recurring: false,
          email: email,
        },
      ];

      // Mocking the Transaction.find method to return mockTransactions
      Transaction.find.mockResolvedValue(mockTransactions);

      const response = await request(app).get(`/transactions/${email}`);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockTransactions);
      expect(Transaction.find).toHaveBeenCalledWith({ email });
    });


    test('Should return an empty array if the user has no transactions', async () => {
      const email = 'test@example.com';

      // Mocking the Transaction.find method to return an empty array
      Transaction.find.mockResolvedValue([]);

      const response = await request(app).get(`/transactions/${email}`);

      expect(response.status).toBe(201);
      expect(response.body).toEqual([]); // Should return an empty array
      expect(Transaction.find).toHaveBeenCalledWith({ email });
    });


    test('Should return 400 for an invalid email', async () => {
      // Simulate an invalid email case
      const invalidEmail = 'invalid-email';

      // Mocking the Transaction.find method to throw an error for invalid email handling
      Transaction.find.mockRejectedValue(new Error('Invalid email format'));

      const response = await request(app).get(`/transactions/${invalidEmail}`);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Invalid email format' });
    });


    test('Should return 400 if there is a database error', async () => {
      const email = 'test@example.com';

      // Mocking the Transaction.find method to reject the promise with an error
      Transaction.find.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get(`/transactions/${email}`);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Database error' });
    });

  });
});