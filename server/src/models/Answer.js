import mongoose from "mongoose";
import validateAllowedFields from "../util/validateAllowedFields.js";

const answerSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  question_id: {
    type: String,
    required: true,
  },
  answer_content: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  like_counter: {
    type: Number,
    default: 0,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  approval_timestamp: {
    type: Date,
    default: null,
  },
});

export const validateAnswer = (
  answerObject,
  requireAnswerContent = true,
  requireAnswerId = true,
  requireUserId = true,
  requireQuestionId = true
) => {
  const errorList = [];
  const allowedKeys = [
    "answer_id",
    "user_id",
    "question_id",
    "answer_content",
    "created_at",
    "like_counter",
    "isApproved",
    "approval_timestamp",
  ];

  const validatedKeysMessage = validateAllowedFields(answerObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (requireAnswerId && answerObject.answer_id == null) {
    errorList.push("Answer ID is a required field");
  }

  if (requireAnswerContent && answerObject.answer_content == null) {
    errorList.push("Answer Content is a required field");
  }

  if (requireUserId && answerObject.user_id == null) {
    errorList.push("User ID is a required field");
  }

  if (requireQuestionId && answerObject.question_id == null) {
    errorList.push("Question ID is a required field");
  }

  return errorList;
};

const Answer = mongoose.model("answers", answerSchema);

export default Answer;
