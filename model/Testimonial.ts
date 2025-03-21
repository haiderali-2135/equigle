import mongoose, { Schema, model } from "mongoose";

const testimonialSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  company: { type: String, required: true },
  review: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

export const Testimonial =
  mongoose.models.Testimonial || model("Testimonial", testimonialSchema);
