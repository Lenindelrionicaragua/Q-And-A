import express from "express";
import cors from "cors";

import userRouter from "./routes/user.js";
import questionRouter from "./routes/questions.js";
import answerRouter from "./routes/answers.js";
import { logError } from "./util/logging.js";

// Create an express server
const app = express();

// Tell express to use the json middleware
app.use(express.json());
// Allow everyone to access our API. In a real application, we would need to restrict this!
app.use(cors());

/****** Attach routes ******/
/**
 * We use /api/ at the start of every route!
 * As we also host our client code on heroku we want to separate the API endpoints.
 */
app.use("/api/user", userRouter);
app.use("/api/questions", questionRouter);
app.use("/api/questions/:questionId/answers", answerRouter);

// Very basic error handling
app.use((err, req, res) => {
  logError(err.stack);
  res
    .status(500)
    .send("An error occured during your request. Please try again!");
});

export default app;
