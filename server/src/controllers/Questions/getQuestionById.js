import Question from "../../models/Question.js";
import Answer from "../../models/Answer.js";

const getQuestionById = async (req, res) => {
  const questionId = req.params.id;
  const question = await Question.findById(questionId);

  if (!question) {
    return res.status(404).json({ success: false, msg: "Question not found" });
  }

  question.answers = await Answer.find({ questionId });

  res.status(200).json({ success: true, result: question });
};

export default getQuestionById;
