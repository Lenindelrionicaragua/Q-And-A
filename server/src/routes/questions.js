import express from "express";

async function handler(req, res) {
  //console.log(req);
  //this res send to client side just for test the API route working correctly
  //i did'nt connect the database yet
  res.status(200).json({ message: "done!" });
}
const questionsRouter = express.Router();
questionsRouter.get("/questions", handler);

export default handler;
