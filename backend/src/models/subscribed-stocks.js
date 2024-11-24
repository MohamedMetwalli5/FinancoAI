import mongoose from "mongoose";

// The subscribed stocks schema
const subscribedStocksSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    subscribedstocks: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

const SubscribedStocks = mongoose.model("subscribedstocks", subscribedStocksSchema);

export default SubscribedStocks;
