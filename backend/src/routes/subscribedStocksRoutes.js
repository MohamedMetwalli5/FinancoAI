import express from "express";
import SubscribedStocks from "../models/subscribed-stocks.js";

const router = express.Router();

// To update the user subscribed stocks list in the "Dashboard" page
router.put("/:id", async (req, res) => {
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
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params; 
    const userSubscribedStocks = await SubscribedStocks.find({ id });
    res.status(200).send(userSubscribedStocks);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
  

export default router;