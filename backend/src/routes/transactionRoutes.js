import express from "express";
import Transaction from "../models/transaction.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authenticateToken);


// To add a new transaction from the user in the "Dashboard" page
router.post("/", async (req, res) => {
    try {
      const email = req.user.email;
  
      const newTransaction = await Transaction.create({
        ...req.body,
        email,
      });
  
      res.status(201).send(newTransaction);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
});
  

// To get all the transactions of the user in the "Dashboard" page
router.get("/:email", async (req, res) => {
  try {
      const {email} = req.params;
      const transactions = await Transaction.find({ email });
      res.status(201).send(transactions);
  } catch (error) {
      res.status(400).send({ error: error.message });
  }
});

export default router;