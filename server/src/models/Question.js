import mongoose from "mongoose";

import validateAllowedFields from "../util/validateAllowedFields.js";
import { logInfo } from "../util/logging.js";

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  question_title: {
    type: String,
    required: true,
  },
  question_content: {
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
  // Module_ids will contain for now module names (strings).
  // On next stages, Modules collection will be connected.
  module_ids: [
    {
      type: String,
    },
  ],
  visit_counter: {
    type: Number,
    default: 0,
  },
});

export const validateQuestion = (
  questionObject,
  requireTitle = true,
  requireContent = true
) => {
  const errorList = [];
  const allowedKeys = [
    "user_id",
    "question_title",
    "question_content",
    "module_ids",
  ];

  const validatedKeysMessage = validateAllowedFields(
    questionObject,
    allowedKeys
  );

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (requireTitle && questionObject.question_title == null) {
    errorList.push("Title is a required field");
    logInfo("Question Validation failed: Title is required");
  }

  if (requireContent && questionObject.question_content == null) {
    errorList.push("Content is a required field");
    logInfo("Question Validation failed: Content is required");
  }

  return errorList;
};

const Question = mongoose.model("question", questionSchema);

export default Question;
