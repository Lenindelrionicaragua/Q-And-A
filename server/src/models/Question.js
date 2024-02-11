import mongoose from "mongoose";

import validateAllowedFields from "../util/validateAllowedFields.js";
import { logInfo } from "../util/logging.js";

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  // author: { type: String, required: true },
});

export const validateQuestion = (
  questionObject,
  requireTitle = true,
  requireContent = true
  // requireAuthor = true
) => {
  const errorList = [];
  const allowedKeys = ["title", "content", "author"];

  const validatedKeysMessage = validateAllowedFields(
    questionObject,
    allowedKeys
  );

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (requireTitle && questionObject.title == null) {
    errorList.push("Title is a required field");
    logInfo("Question Create Validation failed: Title is required");
  }

  if (requireContent && questionObject.content == null) {
    errorList.push("Content is a required field");
    logInfo("Question Create Validation failed: Content is required");
  }

  return errorList;
};
//i change module name from question(s) to question without (s) because i get error can not overwrite..
const Question = mongoose.model("question", questionSchema);

export default Question;
