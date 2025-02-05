import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { db, startHeartbeat } from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import trasactionRoutes from "./routes/transactionRoutes.js";
import tipsRoutes from "./routes/tipsRoutes.js";
import subscribedStocksRoutes from "./routes/subscribedStocksRoutes.js";
import marketNewsRouter from "./routes/marketNewsRoutes.js";
import OAuth2Router from "./routes/OAuth2Routes.js";


const port = process.env.PORT || 5001;

db(); // Initializing the MongoDB connection
startHeartbeat(); // Starting the heartbeat process

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL })); // The frontend URL

app.use("/users", userRoutes);
app.use("/transactions", trasactionRoutes);
app.use("/tips", tipsRoutes);
app.use("/subscribed-stocks", subscribedStocksRoutes);
app.use("/news", marketNewsRouter);
app.use("/OAuth2", OAuth2Router);


// Starting the server only if it isn't in a test environment
if (process.env.NODE_ENV !== "test") {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

export default app; // Exporting the app for testing