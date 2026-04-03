import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();

async function debugConnection() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("❌ MONGODB_URI is missing in .env!");
    return;
  }

  console.log("🔍 Testing connection to:", uri.replace(/:([^@]+)@/, ":****@")); // Mask password
  
  const client = new MongoClient(uri, { 
    serverSelectionTimeoutMS: 5000, 
    connectTimeoutMS: 5000 
  });

  try {
    console.log("⏳ Trying to connect...");
    await client.connect();
    console.log("✅ SUCCESS! Connected to MongoDB.");
    
    const db = client.db("linkedin-scraper");
    const ping = await db.command({ ping: 1 });
    console.log("🏓 PING OK:", ping);

  } catch (err: any) {
    console.error("❌ ERROR FAILED!");
    console.error("--------------------------------------------------");
    console.error("Code:", err.code);
    console.error("Name:", err.name);
    console.error("Message:", err.message);
    if (err.reason) {
      console.error("Reason Topology:", err.reason.type);
    }
    console.error("--------------------------------------------------");
    console.log("\n💡 HINT: If you see 'ServerSelectionError' or 'ReplicaSetNoPrimary', it's usually the IP Whitelist or Port 27017 being blocked.");
    console.log("💡 HINT: If you see 'Authentication failed', your myfiverr:password in .env is incorrect.");
  } finally {
    await client.close();
  }
}

debugConnection();
