import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import User from "./models/user.js";

dotenv.config();

const port = process.env.PORT || 5000;

db();

const app = express();


app.listen(5000, () => {
    console.log(`Server is running on port ${port}`)
});

app.get("/", async (req, res) => {
    const users = await User.find();
    res.send(users);
});

app.post("/signup", async (req, res) => {
    const newUser = await User.create(req.body);
    res.send(newUser);
});