import Question from "../../models/Question.js";

const getUserQuestions = async (req, res) => {
  try {
    const userId = req.headers.authorization;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, error: "User ID not provided in headers" });
    }

    const allQuestions = await Question.find();

    const userQuestions = allQuestions.filter(
      (question) => question.user_id === userId
    );

    res.status(200).json({
      success: true,
      result: userQuestions,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch user questions" });
  }
};

export default getUserQuestions;
