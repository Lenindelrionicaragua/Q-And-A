import express from "express";
import { signup } from "../controllers/AuthControllers/signupController.js";
import { login } from "../controllers/AuthControllers/loginController.js";
//import { logout } from "../controllers/AuthControllers/logoutController.js";

const authRouter = express.Router();

authRouter.post("/sign-up", signup);
authRouter.post("/log-in", login);
//authRouter.post("/log-out", logout);

export default authRouter;
