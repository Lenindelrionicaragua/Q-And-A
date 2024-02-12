import express from "express";
import getQuestions from "../controllers/Questions/getQuestions.js";
import createQuestion from "../controllers/Questions/createQuestion.js";

const questionRouter = express.Router();
questionRouter.get("/", getQuestions);
questionRouter.post("/create", createQuestion);

export default questionRouter;
