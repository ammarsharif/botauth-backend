import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    type: String,
    li_at: String,
    JSESSIONID: String,
    rawCookies: String,
    savedAt: Date,
    status: String,
    passcode: { type: String, default: "1122" }
  },
  { collection: "cindy_config" }
);

export const CindyConfig = mongoose.model("CindyConfig", schema);
