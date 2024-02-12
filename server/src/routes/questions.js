import express from "express";
import { getQuestions } from "../controllers/questions.js";

const questionsRouter = express.Router();
questionsRouter.get("/", getQuestions);

export default questionsRouter;
