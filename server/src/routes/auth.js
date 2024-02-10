import express from "express";
import { login } from "../controllers/AuthControllers/loginController.js";
import { signup } from "../controllers/AuthControllers/signupController.js";

const authRouter = express.Router();

authRouter.post("/log-in", login);
authRouter.post("/sign-up", signup);

export default authRouter;
