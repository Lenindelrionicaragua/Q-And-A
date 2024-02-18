import Question from "../../models/Question.js";
import Answer from "../../models/Answer.js";
import User from "../../models/User.js";
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
    if (answers?.length > 0) {
      const userIds = answers.map((answer) => answer.user_id);
      // Referance : https://mongoosejs.com/docs/queries.html
      const userNames = await User.find({ _id: { $in: userIds } }).select(
        "name _id"
      );

      question.answers = answers?.map((x) => {
        const user = userNames.find((y) => y.id === x.user_id);
        x.author = user?.name ?? "Unactive user";
        return x;
      });
    }

    // Add answers as a property of question
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
