import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    type: String,
    auth_token: String,
    ct0: String,
    twid: String,
    username: String,
    rawCookies: String,
    savedAt: Date,
    status: String
  },
  { collection: "xavier_config" }
);

export const XavierConfig = mongoose.model("XavierConfig", schema);
