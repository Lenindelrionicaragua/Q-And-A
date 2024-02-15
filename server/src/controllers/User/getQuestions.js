import Questions from "../../models/Question.js";

const getUserQuestions = async (req, res) => {
  const { authorization: userId } = req.headers;
  //console.log(userId);
  try {
    const allQuestions = await Questions.find();

    res.status(200).json({
      success: true,
      result: allQuestions.filter((question) => question.user_id === userId),
    });
  } catch (error) {
    res
      .status(501)
      .json({ success: false, msg: "felid to fetch your questions!" });
  }
};

export default getUserQuestions;
