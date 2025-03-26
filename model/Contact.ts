import mongoose, { Schema, model } from "mongoose";

const contactSchema = new Schema({
  C_id: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  email_link: { type: String, required: true },
  ph_number: { type: String, required: true },
  whatsapp_link: { type: String, required: true },
  linkedin_link: { type: String, required: true },
  instagram_link: { type: String, required: true },
  twitter_link: { type: String, required: true },
  address: { type: String, required: true },
  developer_link: { type: String, required: true },
});

export const Contact =
  mongoose.models.Contact || model("Contact", contactSchema);
