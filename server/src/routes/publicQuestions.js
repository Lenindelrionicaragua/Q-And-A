import express from "express";
import getQuestions from "../controllers/Questions/getQuestions.js";

const publiQuestionsRouter = express.Router();

publiQuestionsRouter.get("/", getQuestions);

export default publiQuestionsRouter;
