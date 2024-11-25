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
          { email, subscribedstocks: subscribedstocks || [] },
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

    let userSubscribedStocks = await SubscribedStocks.findOne({ email });

    // If no subscription exists, we create a new document for the user
    if (!userSubscribedStocks) {
      userSubscribedStocks = new SubscribedStocks({
        email,
        subscribedstocks: [], // Default empty array
      });

      await userSubscribedStocks.save();
    }

    res.status(200).send(userSubscribedStocks);
  } catch (error) {
    console.error("Error fetching or saving subscriptions:", error);  // Log the error for debugging
    res.status(400).send({ error: error.message });
  }
});

  

export default router;