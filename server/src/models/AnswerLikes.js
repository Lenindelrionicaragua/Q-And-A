import mongoose from "mongoose";
import validateAllowedFields from "../util/validateAllowedFields.js";

const answerLikesSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  answer_id: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const validateAnswerLike = (
  answerLikeObject,
  requireAnswerId = true,
  requireUserId = true
) => {
  const errorList = [];
  const allowedKeys = ["user_id", "answer_id", "created_at"];

  const validatedKeysMessage = validateAllowedFields(
    answerLikeObject,
    allowedKeys
  );

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (requireAnswerId && !answerLikeObject.answer_id) {
    errorList.push("answer_id is required");
  }

  if (requireUserId && !answerLikeObject.user_id) {
    errorList.push("user_id is required");
  }

  return errorList;
};

const AnswerLikes = mongoose.model("answerLikes", answerLikesSchema);

export default AnswerLikes;
