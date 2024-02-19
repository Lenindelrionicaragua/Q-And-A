import express from "express";
import getUserQuestions from "../../controllers/User/getQuestions.js";
import getQuestionById from "../../controllers/User/getQuestionById.js";
import removeUserQuestion from "../../controllers/User/removeQuestionById.js";

const userQuestionsRouter = express.Router();
userQuestionsRouter.get("/userId/:id", getUserQuestions);
userQuestionsRouter.get("/:questionId", getQuestionById);
userQuestionsRouter.delete("/delete/:questionId", removeUserQuestion);

export default userQuestionsRouter;
