import Question from "../../models/Question.js";

const getQuestionById = async (req, res) => {
  const questionId = req.params.questionId;

  try {
    const question = await Question.findOne({ _id: questionId });
    res.status(200).json({
      success: true,
      result: question,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      msg: "Can not fetch question!",
    });
  }
};

export default getQuestionById;
