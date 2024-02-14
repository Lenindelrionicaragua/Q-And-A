import { logInfo } from "../../util/logging.js";
import validationErrorMessage from "../../util/validationErrorMessage.js";
import Answer, { validateAnswer } from "../../models/Answer.js";
import Question from "../../models/Question.js";

export const getAnswers = async (req, res) => {
  try {
    const questionExist = await isQuestionExist(req);

    if (!questionExist) {
      res.status(404).json({
        success: false,
        msg: `Question with id ${req.params.questionId} does not exist`,
      });
      return;
    }

    const answers = await Answer.find({ questionId: req.params.questionId });
    res.status(200).json({ success: true, result: answers });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

const isQuestionExist = async (req) => {
  return (
    (await Question.findOne({ questionId: req.params.questionId })) != null
  );
};

export const createAnswer = async (req, res) => {
  try {
    const questionExist = await isQuestionExist(req);

    if (!questionExist) {
      res.status(404).json({
        success: false,
        msg: `Question with id ${req.params.questionId} does not exist`,
      });
      return;
    }
    const answer = req.body;

    if (typeof answer !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide an 'answer' object. Received: ${JSON.stringify(
          answer
        )}`,
      });
      return;
    }

    const errorList = validateAnswer(answer, true, false);

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
      return;
    }

    const newAnswer = await Answer.create(answer);
    logInfo("Answer created successfully:", newAnswer);

    res.status(201).json({ success: true, answer: newAnswer });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

export const updateAnswer = async (req, res) => {
  try {
    const questionExist = await isQuestionExist(req);

    if (!questionExist) {
      res.status(404).json({
        success: false,
        msg: `Question with id ${req.params.questionId} does not exist`,
      });
      return;
    }

    const { answer } = req.body;

    if (typeof answer !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide an 'answer' object. Received: ${JSON.stringify(
          answer
        )}`,
      });
      return;
    }

    const errorList = validateAnswer(answer);

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
      return;
    }

    const updatedAnswer = await Answer.findByIdAndUpdate(
      answer.answer_id,
      answer,
      { new: true }
    );
    logInfo("Answer updated successfully:", updatedAnswer);

    res.status(200).json({ success: true, answer: updatedAnswer });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

export const patchAnswer = async (req, res) => {
  try {
    const questionExist = await isQuestionExist(req);

    if (!questionExist) {
      res.status(404).json({
        success: false,
        msg: `Question with id ${req.params.questionId} does not exist`,
      });
      return;
    }

    const { answer } = req.body;

    if (typeof answer !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide an 'answer' object. Received: ${JSON.stringify(
          answer
        )}`,
      });
      return;
    }

    const errorList = validateAnswer(answer);

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
      return;
    }

    const updatedAnswer = await Answer.findByIdAndUpdate(answer.answer_id, {
      $set: { answer_content: answer.answer_content },
    });

    logInfo("Answer updated successfully:", updatedAnswer);

    res.status(200).json({ success: true, answer: updatedAnswer });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

export const deleteAnswer = async (req, res) => {
  try {
    const questionExist = await isQuestionExist(req);

    if (!questionExist) {
      res.status(404).json({
        success: false,
        msg: `Question with id ${req.params.questionId} does not exist`,
      });
      return;
    }

    const { answerId } = req.params;

    if (!answerId) {
      res.status(400).json({
        success: false,
        msg: "You need to provide an 'answerId' parameter",
      });
      return;
    }

    const deletedAnswer = await Answer.findByIdAndDelete(answerId);

    if (!deletedAnswer) {
      res.status(404).json({
        success: false,
        msg: `Answer with id ${answerId} does not exist`,
      });
      return;
    }

    logInfo("Answer deleted successfully:", deletedAnswer);

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};
