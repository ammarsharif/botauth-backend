import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    type: String,
    li_at: String,
    JSESSIONID: String,
    rawCookies: String,
    savedAt: Date,
    status: String
  },
  { collection: "cindy_config" }
);

export const CindyConfig = mongoose.model("CindyConfig", schema);
