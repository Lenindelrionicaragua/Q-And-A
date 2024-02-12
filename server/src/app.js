import express from "express";
import cors from "cors";

import userRouter from "./routes/user.js";
import questionsRouter from "./routes/question.js";
import { sessionMiddleware } from "./middleware/sessionMiddleware.js";
import authRouter from "./routes/auth.js";
import answerRouter from "./routes/answers.js";

// Create an express server
const app = express();

// Middleware to access req.session in all request.
app.use(sessionMiddleware);

// Tell express to use the json middleware
app.use(express.json());
// Allow everyone to access our API. In a real application, we would need to restrict this!
app.use(cors());
//const PORT = 5000; // Use the port your server should run on

// app.get("/", (req, res) => {
//   res.send("Backend server is running!");
// });

/****** Attach routes ******/
/**
 * We use /api/ at the start of every route!
 * As we also host our client code on heroku we want to separate the API endpoints.
 */
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/questions", questionsRouter);
app.use("/api/questions/:questionId/answers", answerRouter);

export default app;
