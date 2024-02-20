import express from "express";
import createQuestion from "../controllers/Questions/createQuestion.js";

const questionsRouter = express.Router();

questionsRouter.post("/create", createQuestion);

export default questionsRouter;
