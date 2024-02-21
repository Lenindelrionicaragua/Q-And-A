import express from "express";
import { getAnswers } from "../controllers/Answers/answerController.js";

const publicAnswerRouter = express.Router();

publicAnswerRouter.get("/", getAnswers);

export default publicAnswerRouter;
