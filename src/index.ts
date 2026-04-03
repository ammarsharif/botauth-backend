import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db";
import botRoutes from "./routes/bots";

dotenv.config();

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "x-api-key"]
}));
app.use(express.json());

app.use("/api/bots", botRoutes);

app.get("/health", (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT ?? 3001;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`BotAuth backend running on port ${PORT}`));
  })
  .catch((err: unknown) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });
