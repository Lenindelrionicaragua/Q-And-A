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
  user_name: {
    type: String,
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
  requireContent = true,
  requireModules = true
) => {
  const errorList = [];
  const allowedKeys = [
    "user_id",
    "user_name",
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

  logInfo(questionObject.module_ids);
  logInfo(questionObject.module_ids.length);

  if (requireModules && questionObject.module_ids.length < 1) {
    errorList.push("Modules are a required field");
    logInfo("Question Validation failed: Modules are required");
  }

  return errorList;
};

const Question = mongoose.model("questions", questionSchema);

export default Question;
