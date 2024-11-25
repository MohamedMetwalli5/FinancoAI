import express from "express";
import SubscribedStocks from "../models/subscribed-stocks.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authenticateToken);


// To update the user subscribed stocks list in the "Dashboard" page
router.put("/:email", async (req, res) => {
  try {
      const { email } = req.params;
      const { subscribedstocks } = req.body;

      if (!subscribedstocks || !Array.isArray(subscribedstocks)) {
          return res.status(400).send({ error: "Subscribed stocks must be a non-empty array." });
      }

      const updatedStocks = await SubscribedStocks.findOneAndUpdate(
          { email },
          { email, subscribedstocks },
          { new: true, upsert: true }
      );

      res.status(200).send(updatedStocks);
  } catch (error) {
      console.error(error);
      res.status(400).send({ error: error.message });
  }
});




// To get all the subscribed stock of the user (using the user ID which is the stored email in this case here)
router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params; 
    const userSubscribedStocks = await SubscribedStocks.find({ email });
    res.status(200).send(userSubscribedStocks);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
  

export default router;