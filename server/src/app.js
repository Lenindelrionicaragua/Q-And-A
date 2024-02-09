import express from "express";
import cors from "cors";
import { sessionMiddleware } from "./middleware/sessionMiddleware.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";

// Create an express server
const app = express();

// Middleware para acceder a req.session en todas las solicitudes
app.use(sessionMiddleware);

// Tell express to use the json middleware
app.use(express.json());
// Allow everyone to access our API. In a real application, we would need to restrict this!
app.use(cors());

/****** Attach routes ******/
/**
 * We use /api/ at the start of every route!
 * As we also host our client code on heroku we want to separate the API endpoints.
 */
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

export default app;
