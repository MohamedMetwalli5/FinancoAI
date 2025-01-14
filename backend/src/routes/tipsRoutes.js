import express from "express";
import { v4 as uuidv4 } from 'uuid';
import Tips from "../models/tips.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authenticateToken);


// To add a new tips from the user in the "Dashboard" page
router.post("/", async (req, res) => {
    // Validation of the required fields
    const { email, text } = req.body;
    if (!email || !text) {
        return res.status(400).send({ error: "Email and text are required." });
    }
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
router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const OneUserTips = await Tips.findOne({ email });

    let otherUsersTips;
    if (!OneUserTips) {
      otherUsersTips = await Tips.find(); // If there are no tips found for the current user, we return all the tips
    } else {
      otherUsersTips = await Tips.find();
      otherUsersTips = otherUsersTips.filter((userstips) => userstips.email !== email); // fetching and filtering out the current user's tips
    }

    res.status(200).send(otherUsersTips);  // sending the filtered tips
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export default router;