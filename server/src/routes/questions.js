import express from "express";
import { getQuestions } from "../controllers/questions.js";
import createQuestion from "../controllers/Questions/createQuestion.js";

const questionsRouter = express.Router();
questionsRouter.get("/", getQuestions);
questionRouter.post("/create", createQuestion);


export default questionsRouter;

