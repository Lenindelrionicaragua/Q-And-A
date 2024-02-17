import Question from "../../models/Question.js";
import { logError } from "../../util/logging.js";

const getQuestions = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm; // Get searchTerm from query string
    let questions;
    if (searchTerm) {
      questions = await Question.find({
        $or: [
          { question_title: { $regex: searchTerm, $options: "i" } },
          { question_content: { $regex: searchTerm, $options: "i" } },
          { module_ids: { $regex: searchTerm, $options: "i" } },
        ],
      });
    } else {
      questions = await Question.find({});
    }

    res.status(200).json({ success: true, questions: questions });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get questions, try again later",
    });
  }
};

export default getQuestions;
