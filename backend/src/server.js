import express from "express";
import dotenv from "dotenv";
import { v4 as uuidv4 } from 'uuid';
import db from "./config/db.js";
import User from "./models/user.js";
import Transaction from "./models/transaction.js";
import Tips from "./models/tips.js";
import SubscribedStocks from "./models/subscribed-stocks.js";

dotenv.config();

const port = process.env.PORT || 5000;

db();

const app = express();
app.use(express.json());

app.listen(5000, () => {
    console.log(`Server is running on port ${port}`)
});

app.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});


app.post("/signup", async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});


app.post("/transactions", async (req, res) => {
    try {
        const newTransaction = await Transaction.create(req.body);
        res.status(201).send(newTransaction);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});


app.post("/tips", async (req, res) => {
    try {
      const data = {
        ...req.body,
        id: req.body.id || uuidv4(),
      };
      const newTips = await Tips.create(data);
      res.status(201).send(newTips);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
});


app.put("/subscribed-stocks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { subscribedstocks } = req.body;
      const updatedStocks = await SubscribedStocks.findOneAndUpdate(
        { id },
        { subscribedstocks },
        { new: true, upsert: true } // Returning the updated doc and creating it if it doesn't exist
      );

      res.status(200).send(updatedStocks);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
});
  


