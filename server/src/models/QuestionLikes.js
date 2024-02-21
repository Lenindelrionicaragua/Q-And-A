import mongoose from "mongoose";
import validateAllowedFields from "../util/validateAllowedFields.js";
import { logInfo } from "../util/logging.js";

const questionLikesSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    trim: true,
  },
  question_id: {
    type: String,
    required: true,
  },
  like_timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const validateLike = (likeQuestion) => {
  const errors = {};
  const allowedKeys = ["user_id", "question_id", "like_timestamp"];

  const validatedKeysMessage = validateAllowedFields(likeQuestion, allowedKeys);
  if (validatedKeysMessage.length > 0) {
    errors.validatedKeys = validatedKeysMessage;
  }

  if (!likeQuestion.user_id || !likeQuestion.user_id.trim()) {
    errors.user_id = "User ID is a required field and cannot be empty";
    logInfo("Like Validation failed: User ID is required");
  }

  if (!likeQuestion.question_id) {
    errors.question_id = "Question ID is a required field and cannot be empty";
    logInfo("Like Validation failed: Question ID is required");
  }

  if (Object.keys(errors).length > 0) {
    logInfo("Like Validation failed:", errors);
  }

  return errors;
};

const QuestionLikes = mongoose.model("questionLikes", questionLikesSchema);
export default QuestionLikes;
