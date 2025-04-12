import mongoose, { Schema, model } from "mongoose";

const MessageSchema = new Schema({
  M_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

export const Message =
  mongoose.models.Message || model("Message", MessageSchema);
