import mongoose from "mongoose";

const subscribedStocksSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        subscribedstocks: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const SubscribedStocks = mongoose.model("SubscribedStocks", subscribedStocksSchema);

export default SubscribedStocks;
