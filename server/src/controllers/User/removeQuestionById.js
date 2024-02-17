import Question from "../../models/Question.js";

const removeUserQuestion = async (req, res) => {
  const questionId = req.params.questionId;

  try {
    const deletedQuestion = await Question.deleteOne({ _id: questionId });
    res.status(200).json({
      success: true,
      result: deletedQuestion,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      msg: "Failed to delete question!",
    });
  }
};

export default removeUserQuestion;
