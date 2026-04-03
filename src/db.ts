import mongoose from "mongoose";
import dns from "node:dns";

export async function connectDB(): Promise<void> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set in environment");
  dns.setServers(['8.8.8.8', '8.8.4.4']);

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
    console.log("MongoDB connected successfully");
  } catch (err: any) {
    console.error("Failed to connect to MongoDB:", err.message);
    throw err;
  }
}
