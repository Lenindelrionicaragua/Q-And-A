import connectDB from "../db/connectDB";

export const fetchQuestions = async () => {
  const db = connectDB();
  const questions = await db.collection("questions");
  return questions;
};
