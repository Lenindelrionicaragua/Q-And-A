import express from "express";
import getQuestions from "../controllers/Questions/getQuestions.js";
import createQuestion from "../controllers/Questions/createQuestion.js";

const questionsRouter = express.Router();

questionsRouter.get("/", getQuestions);
questionsRouter.post("/create", createQuestion);

export default questionsRouter;
