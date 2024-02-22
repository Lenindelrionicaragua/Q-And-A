import { logInfo } from "../../util/logging.js";
import validationErrorMessage from "../../util/validationErrorMessage.js";
import Answer, { validateAnswer } from "../../models/Answer.js";
import Question from "../../models/Question.js";
import AnswerLikes from "../../models/AnswerLikes.js";

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

    const answer = await Answer.findById(answerId);

    if (!answer) {
      res.status(404).json({
        success: false,
        msg: `Answer with id ${answerId} does not exist`,
      });
      return;
    }

    if (answer.user_id !== req.userId) {
      return res.sendStatus(403);
    }

    answer.delete();

    logInfo("Answer deleted successfully:", answer);

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

export const likeAnswer = async (req, res) => {
  const { answerId } = req.params;
  const { user_id } = req.body;
  try {
    const isAnswerBelongsToUser =
      (await Answer.findOne({ user_id: user_id, answer_id: answerId })) != null;

    if (isAnswerBelongsToUser) {
      logInfo("Answer belongs to user");
      res
        .status(400)
        .json({ success: false, message: "User cannot like its own answer" });
    }
    const existingLike = await AnswerLikes.findOne({ user_id, answerId });

    if (existingLike) {
      await AnswerLikes.deleteOne({ user_id, answerId });
      await Answer.findByIdAndUpdate(answerId, { $inc: { like_counter: -1 } });
    } else {
      const newLike = new AnswerLikes({ user_id, answer_id: answerId });
      await newLike.save();
      await Answer.findByIdAndUpdate(answerId, { $inc: { like_counter: 1 } });
    }

    const { like_counter } = await Answer.findById(answerId)
      .select("like_counter")
      .lean();

    res.json({
      success: true,
      result: { likeCounter: like_counter, isLiked: !existingLike },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
