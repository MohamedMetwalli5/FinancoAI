import dotenv from "dotenv";
dotenv.config();
import express from "express";
import User from "../models/user.js";
import Tips from "../models/tips.js";
import SubscribedStocks from "../models/subscribed-stocks.js";
import Transaction from "../models/transaction.js";
import authenticateToken from "../middlewares/authMiddleware.js";
import generateToken from "../utils/tokenUtils.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const router = express.Router();


// To get the user data info in the "signin" page
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    // Comparing the provided password with the stored password
    if(user.passwordHash !== password){
      return res.status(400).send({ error: "Invalid credentials" });
    }

    // Creating a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }  // Token expiration time (1 hour here)
    );

    // Sending the user data and token back
    res.status(200).send({token});
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});


// To update the user info in the "settings" page
router.put("/:email", authenticateToken, async (req, res) => {
  try {
    const { email } = req.params;
    const { name, passwordHash, timezone, emailNotifications } = req.body;
    if(!name || !passwordHash){
      return res.status(400).send({ error:"Invalid input data"});
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        name, 
        passwordHash, 
        preferences: {
          timezone, 
          emailNotifications
        }
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({ error: "User not found" });
    }

    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});


// To delete the user account if he wanted in the "settings" page
router.delete("/:email", authenticateToken, async (req, res) => {
  try {
    const { email } = req.params;

    const theUser = await User.findOne({ email });
    if (!theUser) {
      return res.status(404).send({ error: "User not found" });
    }
    // To delete the user
    await User.deleteOne({ email });

    // To delete the user tips
    const theUserTips = await Tips.findOne({ email });
    if (theUserTips) {
      await Tips.deleteMany({ email });
    }

    // To delete the user subscribed stocks
    const theUserSubscribedStocks = await SubscribedStocks.findOne({ email });
    if (theUserSubscribedStocks) {
      await SubscribedStocks.deleteMany({ email });
    }
    
    // To delete the user transactions
    const theUserTransactions = await Transaction.findOne({ email });
    if (theUserTransactions) {
      await Transaction.deleteMany({ email });
    }

    res.status(200).send("User is Deleted Successfully");
  } catch (error) {
    res.status(400).send({ error: "Failed to delete user" });
  }
});


// To signup a new (unique) user in the "Signup" page
router.post("/signup", async (req, res) => {
    const { name, passwordHash } = req.body;
    if(!name || !passwordHash){
      return res.status(400).send({ error:"Invalid input data"});
    }

    try {
        const newUser = await User.create(req.body);
        const token = generateToken(newUser);
        res.status(201).send({token});
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});


export default router;
