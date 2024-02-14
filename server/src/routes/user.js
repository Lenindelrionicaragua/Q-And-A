import express from "express";
import { getUsers, getUserById, getUserNameById } from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:userId", getUserById);
userRouter.get("/:userId/name", getUserNameById);

export default userRouter;
