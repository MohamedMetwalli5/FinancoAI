import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

const db = async () => {
    try {
        const connection = await mongoose.connect(MONGODB_URL);
        console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

// Heartbeat function to keep the MongoDB cluster active
const heartbeat = async () => {
    try {
        const tempConnection = await mongoose.createConnection(MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const heartbeatCollection = tempConnection.collection("heartbeat"); // Temporary collection
        await heartbeatCollection.insertOne({ timestamp: new Date() }); // Inserting a dummy document
        await heartbeatCollection.deleteMany({}); // Cleaning up the collection

        await tempConnection.close(); // Closing the temporary connection
        console.log("Heartbeat: MongoDB is active");
    } catch (error) {
        console.error("Error in heartbeat:", error);
    }
};

// Function to schedule the heartbeat periodically
const startHeartbeat = () => {
    console.log("Starting heartbeat...");
    setInterval(heartbeat, 24 * 60 * 60 * 1000); // Runs every 24 hours
};

export { db, startHeartbeat };
