import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  author: { type: String, required: true },
});

const Question = mongoose.model("questions", questionSchema);

export default Question;
