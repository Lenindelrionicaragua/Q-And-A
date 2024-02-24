import express from "express";
import getUserQuestions from "../../controllers/User/getQuestions.js";
import getQuestionById from "../../controllers/User/getQuestionById.js";

const userQuestionsRouter = express.Router();
userQuestionsRouter.get("/userId/:id", getUserQuestions);
userQuestionsRouter.get("/:questionId", getQuestionById);

export default userQuestionsRouter;
