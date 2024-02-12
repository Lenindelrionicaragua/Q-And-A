import mongoose from "mongoose";

const questionsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  module: { type: Array, required: true },
  likes: { type: Number, required: true },
  views: { type: Number, required: true },
  author: { type: String, required: true },
  date: { type: Number, required: true },
});

const Questions = mongoose.model("questions", questionsSchema);

export default Questions;
