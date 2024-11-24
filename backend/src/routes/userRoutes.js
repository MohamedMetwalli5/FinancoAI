import express from "express";
import User from "../models/user.js";

const router = express.Router();

// to get all the users in the database
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});


// To get the user data info in the "signin" page
router.get("/:email", async (req, res) => {
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
router.put("/:id", async (req, res) => {
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
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

export default router;
