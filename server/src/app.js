import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { requireAuth } from "./middleware/authMiddleware.js";
import userRouter from "./routes/user.js";
import questionsRouter from "./routes/questions.js";
import publicQuestionsRouter from "./routes/publicQuestions.js";
import authRouter from "./routes/auth.js";
import answerRouter from "./routes/answers.js";
import publicAnswerRouter from "./routes/publicAnswers.js";
import userQuestionsRouter from "./routes/user/userQuestion.js";

dotenv.config();

// Create an express server
const app = express();

// Tell express to use the json middleware
app.use(express.json());
// Restrict access to only our UI
app.use(
  cors({
    credentials: true,
    origin: process.env.UI_BASE_URL,
  })
);
app.use(cookieParser());

/****** Attach routes ******/
/**
 * We use /api/ at the start of every route!
 * As we also host our client code on heroku we want to separate the API endpoints.
 */
app.use("/api/auth", authRouter);

app.use("/api/auth", authRouter);
app.use("/api/user", requireAuth, userRouter);
app.use("/api/user/userQuestions", requireAuth, userQuestionsRouter);
app.use("/api/questions", publicQuestionsRouter);
app.use("/api/answer", publicAnswerRouter);
app.use("/api/questions", requireAuth, questionsRouter);
app.use("/api/answer", requireAuth, answerRouter);
app.use("/api/questions/:questionId/answers", requireAuth, answerRouter);

export default app;
