import express from "express";
import { signup } from "../controllers/AuthControllers/signupController.js";
import { login } from "../controllers/AuthControllers/loginController.js";

const authRouter = express.Router();

authRouter.post("/sign-up", signup);
authRouter.post("/log-in", login);

export default authRouter;
