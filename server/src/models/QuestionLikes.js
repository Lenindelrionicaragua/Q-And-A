import mongoose from "mongoose";
import validateAllowedFields from "../util/validateAllowedFields.js";

const questionLikesSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  question_id: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const validateQuestionLike = (
  questionLikeObject,
  requireQuestionId = true,
  requireUserId = true
) => {
  const errorList = [];
  const allowedKeys = ["user_id", "question_id", "created_at"];

  const validatedKeysMessage = validateAllowedFields(
    questionLikeObject,
    allowedKeys
  );

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (requireQuestionId && !questionLikeObject.question_id) {
    errorList.push("answer_id is required");
  }

  if (requireUserId && !questionLikeObject.user_id) {
    errorList.push("user_id is required");
  }

  return errorList;
};

const QuestionLikes = mongoose.model("questionLikes", questionLikesSchema);

export default QuestionLikes;
