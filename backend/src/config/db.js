import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

const db = async () => {
    try{
        const connection = await mongoose.connect(MONGODB_URL);
        console.log(`mongodb connected: ${connection.connection.host}`);
    }catch (error){
        console.error(error);
    }
}

export default db;