import express from "express";
import getQuestions from "../controllers/Questions/getQuestions.js";
import createQuestion from "../controllers/Questions/createQuestion.js";
import getQuestionById from "../controllers/Questions/getQuestionById.js";

const questionRouter = express.Router();

questionRouter.get("/", getQuestions);
questionRouter.post("/create", createQuestion);
questionRouter.get("/:questionId", getQuestionById);

export default questionRouter;
