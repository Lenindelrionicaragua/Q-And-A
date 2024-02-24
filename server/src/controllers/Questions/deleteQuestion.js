import Question from "../../models/Question.js";

async function deleteQuestion(req, res) {
  const questionId = req.params.questionId;

  try {
    await Question.deleteOne({ _id: questionId });
    res
      .status(200)
      .json({ success: true, msg: "Question deleted successfully" });
  } catch (error) {
    res
      .status(501)
      .json({ success: false, msg: "Can not delete question, try again!" });
  }
}

export default deleteQuestion;
