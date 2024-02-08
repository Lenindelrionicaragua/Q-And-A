import express from "express";
import { getQuestions } from "../controllers/Questions/getQuestions.js";

const questionRouter = express.Router();

questionRouter.get("/", getQuestions);

export default questionRouter;
