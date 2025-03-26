import mongoose, { Schema, model } from "mongoose";

const projectSchema = new Schema({
  P_id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true }, // Store icon as a string (URL or reference)
  imageUrl: { type: String, required: true },
  tasks: { type: [String], required: true },
  stats: { type: [String], required: true },
  tools: { type: [String], required: true },
  technologies: { type: [String], required: true },
  industry: { type: String, required: true },
  category: { type: String, required: true },
});

export const Project =
  mongoose.models.Project || model("Project", projectSchema);
