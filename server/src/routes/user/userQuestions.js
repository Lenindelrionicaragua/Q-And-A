import express from "express";
import getUserQuestions from "../../controllers/User/getQuestions.js";
import getQuestionById from "../../controllers/User/getQuestionById.js";
import removeUserQuestions from "../../controllers/User/removeQuestionById.js";

const userQuestionsRouter = express.Router();
userQuestionsRouter.get("/", getUserQuestions);
userQuestionsRouter.get("/user/questions/:questionId", getQuestionById);
userQuestionsRouter.delete("/user/questions/:questionId", removeUserQuestions);

export default userQuestionsRouter;
