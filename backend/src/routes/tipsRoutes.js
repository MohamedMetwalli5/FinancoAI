import express from "express";
import { v4 as uuidv4 } from 'uuid';
import Tips from "../models/tips.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authenticateToken);


// To add a new tips from the user in the "Dashboard" page
router.post("/", async (req, res) => {
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
    let otherUsersTips = await Tips.find(); 
    otherUsersTips = otherUsersTips.filter((userstips) => userstips.email !== email);
    res.status(200).send(otherUsersTips);  // sending the filtered tips
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export default router;