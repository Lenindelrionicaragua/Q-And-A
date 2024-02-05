import express from "express";
import { createUser, getUsers, loginUser } from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/create", createUser);
userRouter.post("/login", loginUser);

export default userRouter;
