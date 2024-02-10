import express from "express";
import { login, signup } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/sign-up", signup);

export default authRouter;
