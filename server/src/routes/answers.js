import express from "express";
import {
  getAnswers,
  createAnswer,
  updateAnswer,
} from "../controllers/Answers/answerController.js";

const answerRouter = express.Router();

answerRouter.get("/", getAnswers);
answerRouter.post("/create", createAnswer);
answerRouter.put("/:answerId/update", updateAnswer);
answerRouter.patch("/:answerId/patch", updateAnswer);

export default answerRouter;
