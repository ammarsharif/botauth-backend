import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    type: String,
    c_user: String,
    xs: String,
    fb_dtsg: String,
    datr: String,
    sb: String,
    fr: String,
    rawCookies: String,
    savedAt: Date,
    status: String
  },
  { collection: "felix_config" }
);

export const FelixConfig = mongoose.model("FelixConfig", schema);
