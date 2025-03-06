import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURI: string =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/socialNetworkDB";

mongoose.connect(mongoURI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export default db;
