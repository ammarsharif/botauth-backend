import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    type: String,
    sessionid: String,
    ds_user_id: String,
    csrftoken: String,
    mid: String,
    username: String,
    rawCookies: String,
    savedAt: Date,
    status: String,
    passcode: { type: String, default: "1122" }
  },
  { collection: "instar_config" }
);

export const InstarConfig = mongoose.model("InstarConfig", schema);
