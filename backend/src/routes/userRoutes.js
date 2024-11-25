import dotenv from "dotenv";
dotenv.config();
import express from "express";
import User from "../models/user.js";
import authenticateToken from "../middlewares/authMiddleware.js";
import generateToken from "../utils/tokenUtils.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const router = express.Router();

// to get all the users in the database (for testing purposes only)
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});


// To get the user data info in the "signin" page    Sign-in Route (POST method)
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
    res.status(200).send({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token: token,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});


// To update the user info in the "settings" page
router.put("/:id", authenticateToken, async (req, res) => {
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
router.post("/signup", async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        const token = generateToken(newUser);
        res.status(201).send({newUser, token});
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

export default router;
