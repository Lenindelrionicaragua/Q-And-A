import Question from "../../models/Question.js";

const getUserQuestions = async (req, res) => {
  const userId = req.params.id;

  try {
    const allQuestions = await Question.find();

    const userQuestions = allQuestions.filter(
      (question) => question.user_id.toString() === userId
    );
    res.status(200).json({
      success: true,
      result: userQuestions,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch user questions" });
  }
};

export default getUserQuestions;
