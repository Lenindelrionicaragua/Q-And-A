import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.js";
import questionsRouter from "./routes/questions.js";
import publicQuestionsRouter from "./routes/publicQuestions.js";
import { requireAuth } from "./middleware/authMiddleware.js";
import authRouter from "./routes/auth.js";
import answerRouter from "./routes/answers.js";

import userQuestionsRouter from "./routes/user/userQuestions.js";

import publicAnswerRouter from "./routes/publicAnswers.js";

// Create an express server
const app = express();

// Tell express to use the json middleware
app.use(express.json());
// Allow everyone to access our API. In a real application, we would need to restrict this!
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:8080",
  })
);
app.use(cookieParser());

/****** Attach routes ******/
/**
 * We use /api/ at the start of every route!
 * As we also host our client code on heroku we want to separate the API endpoints.
 */
app.use("/api/auth", authRouter);

app.use("/api/user", requireAuth, userRouter);
app.use("/api/questions", publicQuestionsRouter);
app.use("/api/answer", publicAnswerRouter);
app.use("/api/questions", requireAuth, questionsRouter);
app.use("/api/answer", requireAuth, answerRouter);
app.use("/api/user/questions", requireAuth, userQuestionsRouter);
app.use("/api/questions/:questionId/answers", requireAuth, answerRouter);

export default app;
