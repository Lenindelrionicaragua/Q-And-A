// import mongoose from "mongoose";
// const { ObjectId } = mongoose.Types;

import User from "../models/User.js";
import { logError } from "../util/logging.js";
// import { logInfo } from "../util/logging.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, result: users });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get users, try again later" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params;

    const user = await User.findById(userId.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ success: true, result: user });
  } catch (error) {
    logError("Error fetching user by ID:", error);
    return res.status(500).json({ error: "Failed to fetch user by ID" });
  }
};

export const getUserNameById = async (req, res) => {
  try {
    const userId = req.params;

    const user = await User.findById(userId.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ success: true, result: user.name });
  } catch (error) {
    logError("Error fetching user by ID:", error);
    return res.status(500).json({ error: "Failed to fetch user by ID" });
  }
};
