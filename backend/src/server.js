import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import db from "./config/db.js";

import { v4 as uuidv4 } from 'uuid';
import userRoutes from "./routes/userRoutes.js";
import trasactionRoutes from "./routes/transactionRoutes.js";
import tipsRoutes from "./routes/tipsRoutes.js";
import subscribedStocksRoutes from "./routes/subscribedStocksRoutes.js";
import marketNewsRouter from "./routes/marketNewsRoutes.js";


const port = process.env.PORT || 5001;

db();

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" })); // The frontend URL


app.use("/users", userRoutes);
app.use("/transactions", trasactionRoutes);
app.use("/tips", tipsRoutes);
app.use("/subscribed-stocks", subscribedStocksRoutes);
app.use("/news", marketNewsRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});