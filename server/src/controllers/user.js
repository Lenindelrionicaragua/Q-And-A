import User, { validateUser } from "../models/User.js";
import { logError, logInfo } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";

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

export const createUser = async (req, res) => {
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

    // Validate the presence of the 'password' field as well

    const errorList = validateUser(user, true);

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      const newUser = await User.create(user);
      logInfo("User created successfully:", newUser);

      res.status(201).json({ success: true, user: newUser });
    }
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to create user, try again later" });
  }
};

export const loginUser = async (req, res) => {
  const { user } = req.body;

  try {
    const userFound = await User.findOne({ email: user.email });

    if (userFound) {
      logInfo(`User found: ${JSON.stringify(userFound)}`);

      // Before the comparison
      //logInfo(`Password input: ${user.password}`);
      //logInfo(`Stored password: ${userFound.password}`);

      const isPasswordValid =
        user.password.trim() === userFound.password.trim();

      // After the comparison
      logInfo(`Is password valid? ${isPasswordValid}`);

      if (isPasswordValid) {
        const token = userFound.generateAuthToken();
        logInfo(
          `Generated Auth Token for User: ${userFound.email}, Token: ${token}`
        );

        // Send response to the client
        res.status(200).json({ success: true, msg: "Login successful", token });
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
