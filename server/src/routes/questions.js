import express from "express";
import getQuestions from "../controllers/Questions/getQuestions.js";
import createQuestion from "../controllers/Questions/createQuestion.js";
import getQuestionById from "../controllers/Questions/getQuestionById.js";

const questionsRouter = express.Router();

questionsRouter.get("/", getQuestions);
questionsRouter.post("/create", createQuestion);
questionsRouter.get("/:questionId", getQuestionById);

export default questionsRouter;
