import Question from "../../models/Question.js";
import Answer from "../../models/Answer.js";

const getQuestionById = async (req, res) => {
  const questionId = req.params.questionId;

  try {
    const question = await Question.findOne({ _id: questionId });
    const answers = await Answer.find({
      question_id: questionId,
    });

    res.status(200).json({
      success: true,
      result: { ...question._doc, answers },
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      msg: "Can not fetch question!",
    });
  }
};

export default getQuestionById;
