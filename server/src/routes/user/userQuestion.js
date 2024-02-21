import express from "express";
import getUserQuestions from "../../controllers/User/getQuestions.js";
import getQuestionById from "../../controllers/User/getQuestionById.js";
// import toggleUserLike from "../../controllers/Questions/toggleUserLike.js";

const userQuestionsRouter = express.Router();
userQuestionsRouter.get("/userId/:id", getUserQuestions);
userQuestionsRouter.get("/:questionId", getQuestionById);
// userQuestionsRouter.post("/like/:questionId", toggleUserLike);

export default userQuestionsRouter;
