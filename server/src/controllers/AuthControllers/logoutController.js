import { logInfo } from "../../util/logging.js";

export const logout = (req, res) => {
  res.clearCookie("session");

  logInfo("User successfully logged out");

  // Send JSON response to the client confirming successful logout
  res
    .status(200)
    .json({ success: true, message: "User successfully logged out" });
};
