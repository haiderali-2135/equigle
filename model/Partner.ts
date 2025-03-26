import mongoose, { Schema, model } from "mongoose";

const partnerSchema = new Schema({
  P_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  logo: { type: String, required: true },
});

export const Partner =
  mongoose.models.Partner || model("Partner", partnerSchema);
