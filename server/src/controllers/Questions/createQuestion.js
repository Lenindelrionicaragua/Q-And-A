import Question, { validateQuestion } from "../../models/Question.js";
import { logInfo, logError } from "../../util/logging.js";
import validationErrorMessage from "../../util/validationErrorMessage.js";

const createQuestion = async (req, res) => {
  try {
    const { question } = req.body;

    if (typeof question !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'question' object. Received: ${JSON.stringify(
          question
        )}`,
      });

      return;
    }

    const errorList = validateQuestion(question, true);

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      const newQuestion = await Question.create(question);
      logInfo("Question created successfully:", newQuestion);

      res.status(201).json({ success: true, user: newQuestion });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to post question, try again later",
    });
  }
};

export default createQuestion;
