import express from "express";
import cors from "cors";

import userRouter from "./routes/user.js";
import questionsRouter from "./routes/questions.js";
import { sessionMiddleware } from "./middleware/sessionMiddleware.js";
import authRouter from "./routes/auth.js";
import answerRouter from "./routes/answers.js";
import userQuestionsRouter from "./routes/user/userQuestions.js";
import publicQuestionsRouter from "./routes/publicQuestions.js";

// Create an express server
const app = express();

// Middleware to access req.session in all request.
app.use(sessionMiddleware);

// Tell express to use the json middleware
app.use(express.json());
// Allow everyone to access our API. In a real application, we would need to restrict this!
app.use(cors());
//const PORT = 5000; // Use the port your server should run on

/****** Attach routes ******/
/**
 * We use /api/ at the start of every route!
 * As we also host our client code on heroku we want to separate the API endpoints.
 */
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/questions", publicQuestionsRouter);

app.use("/api/questions", questionsRouter);
app.use("/api/answer", answerRouter);

app.use("/api/user/userQuestions", userQuestionsRouter);

app.use("/api/questions/:questionId/answers", answerRouter);

export default app;
