import Question from "../../models/Question.js";
import Answer from "../../models/Answer.js";
import { logError } from "../../util/logging.js";

const getQuestionById = async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const question = await Question.findById(questionId).lean();

    if (!question) {
      return res
        .status(404)
        .json({ success: false, msg: "Question not found" });
    }

    const answers = await Answer.find({ question_id: questionId }).lean();

    question.answers = answers; // Add answers as a property of question
    res.status(200).json({
      success: true,
      result: question,
    });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get questions, try again later",
    });
  }
};

export default getQuestionById;
