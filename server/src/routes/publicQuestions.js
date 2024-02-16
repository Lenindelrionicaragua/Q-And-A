import express from "express";
import getQuestions from "../controllers/Questions/getQuestions.js";

const publicQuestionsRouter = express.Router();

publicQuestionsRouter.get("/", getQuestions);

export default publicQuestionsRouter;
