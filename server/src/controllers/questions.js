import Questions from "../models/Questions.js";
import { logError } from "../util/logging.js";

export const getQuestions = async (req, res) => {
  try {
    const questions = await Questions.find();

    res.status(200).json({ success: true, questions });
  } catch (error) {
    logError(error);
    res
      .status(501)
      .json({ success: false, msg: "failed to connect database!" });
  }
};
