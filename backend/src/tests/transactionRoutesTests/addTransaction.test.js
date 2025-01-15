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

  describe('POST /transactions', () => {
    test('Should create a new transaction', async () => {
      const currentDate = new Date();

      const transactionData = {
        id: 'transaction-1',
        category: 'Food',
        amount: 100,
        description: 'Test transaction',
        date: currentDate.toISOString(), // Using ISO string here (to match MongoDB storing)
        recurring: false,
      };

      // Mocking the creation of a transaction
      Transaction.create.mockResolvedValue({
        ...transactionData,
        email: 'test@example.com',
      });

      const response = await request(app)
        .post('/transactions')
        .send(transactionData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: transactionData.id,
          category: transactionData.category,
          amount: transactionData.amount,
          description: transactionData.description,
          date: currentDate.toISOString(), // Comparing with ISO string for output (to match MongoDB storing)
          recurring: transactionData.recurring,
          email: 'test@example.com',
        })
      );

      expect(Transaction.create).toHaveBeenCalledWith({
        ...transactionData,
        email: 'test@example.com',
      });
    });


    test('Should return 400 when transaction creation fails due to missing required fields', async () => {
      const transactionData = {
        // missing required fields for the test
        id: 'transaction-1',
      };

      // Mocking the creation to throw an error for missing fields
      Transaction.create.mockRejectedValue(new Error('Transaction validation failed'));

      const response = await request(app)
        .post('/transactions')
        .send(transactionData);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Transaction validation failed' });
    });


    test('Should return 400 for invalid transaction data', async () => {
      const transactionData = {
        id: 'transaction-1',
        category: 'Food',
        amount: null, // Invalid data
        description: 'Invalid transaction',
        date: new Date().toISOString(), // Keeping date in ISO format here as well
        recurring: false,
      };

      // Mocking the creation to throw an error for invalid data
      Transaction.create.mockRejectedValue(new Error('Transaction validation failed'));

      const response = await request(app)
        .post('/transactions')
        .send(transactionData);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Transaction validation failed' });
    });

  });
});