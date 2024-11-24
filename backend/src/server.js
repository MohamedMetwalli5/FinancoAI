import express from "express";
import dotenv from "dotenv";
import { v4 as uuidv4 } from 'uuid';
import db from "./config/db.js";
import User from "./models/user.js";
import Transaction from "./models/transaction.js";
import Tips from "./models/tips.js";
import SubscribedStocks from "./models/subscribed-stocks.js";

dotenv.config();

const port = process.env.PORT || 5001;

db();

const app = express();
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});


// to get all the users in the database
app.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});


// To get the user data info in the "signin" page
app.get("/users/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.status(200).send("User found");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});


// To update the user info in the "settings" page
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, hashedpassword, timezone, emailNotifications } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { id },
      { name, hashedpassword, timezone, emailNotifications },
      { new: true }
    )

    if (!updatedUser) {
      return res.status(404).send({ error: "User not found" });
    }
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// To signup a new (unique) user in the "Signup" page
app.post("/signup", async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});


// To add a new transaction from the user in the "Dashboard" page
app.post("/transactions", async (req, res) => {
    try {
        const newTransaction = await Transaction.create(req.body);
        res.status(201).send(newTransaction);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// To get all the transactions of the user in the "Dashboard" page
app.get("/transactions/:email", async (req, res) => {
  try {
      const {email} = req.params;
      const transactions = await Transaction.find({ email });
      res.status(201).send(transactions);
  } catch (error) {
      res.status(400).send({ error: error.message });
  }
});


// To add a new tips from the user in the "Dashboard" page
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


// To get the other users tips to display it to the current user in the "Dashboard" page
app.get("/tips/:email", async (req, res) => {
  try {
    const { email } = req.params;
    let otherUsersTips = await Tips.find(); 
    otherUsersTips = otherUsersTips.filter((userstips) => userstips.email !== email);
    res.status(200).send(otherUsersTips);  // sending the filtered tips
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});


// To update the user subscribed stocks list in the "Dashboard" page
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


// To get all the subscribed stock of the user (using the user ID which is the stored email in this case here)
app.get("/subscribed-stocks/:id", async (req, res) => {
  try {
    const { id } = req.params; 
    const userSubscribedStocks = await SubscribedStocks.find({ id });
    res.status(200).send(userSubscribedStocks);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
  


