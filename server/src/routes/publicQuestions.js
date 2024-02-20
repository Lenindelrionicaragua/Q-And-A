import express from "express";
import getQuestions from "../controllers/Questions/getQuestions.js";
import getQuestionById from "../controllers/Questions/getQuestionById.js";

const publicQuestionsRouter = express.Router();

publicQuestionsRouter.get("/", getQuestions);
publicQuestionsRouter.get("/:questionId", getQuestionById);

export default publicQuestionsRouter;
