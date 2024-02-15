import express from "express";
import createQuestion from "../controllers/Questions/createQuestion.js";
import getQuestionById from "../controllers/Questions/getQuestionById.js";

const questionsRouter = express.Router();

questionsRouter.post("/create", createQuestion);
questionsRouter.get("/:questionId", getQuestionById);

export default questionsRouter;
