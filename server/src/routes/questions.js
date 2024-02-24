import express from "express";
import createQuestion from "../controllers/Questions/createQuestion.js";
import deleteQuestion from "../controllers/Questions/deleteQuestion.js";
import questionLikes from "../controllers/Questions/questionLikes.js";

const questionsRouter = express.Router();

questionsRouter.post("/create", createQuestion);
questionsRouter.delete("/:questionId/delete", deleteQuestion);
questionsRouter.post("/:questionId/like", questionLikes);
export default questionsRouter;
