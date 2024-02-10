import { logInfo, logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
import { validateUser } from "../models/User.js";
import User from "../models/User.js";
import InvitationCode from "../models/InvitationCode.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  const { user } = req.body;

  try {
    const errors = [];
    if (!user.email || !user.password) {
      errors.push("Email and password are required.");
    }

    if (errors.length > 0) {
      const errorMessage = validationErrorMessage(errors);
      res.status(400).json({ success: false, error: errorMessage });
      return;
    }

    // Continue with the login process if there are no validation errors
    const userFound = await User.findOne({ email: user.email });

    if (userFound) {
      logInfo(`User found: ${JSON.stringify(userFound)}`);

      const isPasswordValid = await bcrypt.compare(
        user.password,
        userFound.password
      );

      // After the comparison
      logInfo(`Is password valid? ${isPasswordValid}`);

      if (isPasswordValid) {
        // Establish the user session
        req.user = userFound;
        // Send response to the client
        res.status(200).json({ success: true, msg: "Login successful" });
      } else {
        res.status(401).json({
          success: false,
          msg: "Invalid credentials - Incorrect password",
        });
      }
    } else {
      res
        .status(401)
        .json({ success: false, msg: "Invalid credentials - User not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

export const signup = async (req, res) => {
  try {
    const { user } = req.body;

    if (typeof user !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'user' object. Received: ${JSON.stringify(
          user
        )}`,
      });
      return;
    }

    const isCodeExist =
      (await InvitationCode.findByCode(user.invitationCode)) != null;

    if (!isCodeExist) {
      res
        .status(400)
        .json({ success: false, msg: "Invalid invitation code, try again" });
      return;
    }

    // Validate the presence of the 'password' field as well
    const errorList = validateUser(user, true);
    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });

      return;
    }

    const newUser = await User.create(user);
    res.status(201).json({ success: true, user: newUser });
    await InvitationCode.deleteByCode(user.invitationCode);
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to create user, try again later" });
  }
};
