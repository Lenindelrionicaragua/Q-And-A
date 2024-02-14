import Question from "../../models/Question.js";
import { logError } from "../../util/logging.js";

const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json({ success: true, questions: questions });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get questions, try again later",
    });
  }
};

export default getQuestions;
