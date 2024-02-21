import express from "express";
import {
  createAnswer,
  updateAnswer,
  deleteAnswer,
  likeAnswer,
} from "../controllers/Answers/answerController.js";

const answerRouter = express.Router();

answerRouter.post("/create", createAnswer);
answerRouter.put("/:answerId/update", updateAnswer);
answerRouter.patch("/:answerId/patch", updateAnswer);
answerRouter.delete("/:answerId/delete", deleteAnswer);
answerRouter.post("/:answerId/like", likeAnswer);

export default answerRouter;
