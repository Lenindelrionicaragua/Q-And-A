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
  logInfo("Request body:", req.body);

  try {
    // Log to verify that the request is being sent to the database
    logInfo(`Attempting to find user by email: ${user.email}`);

    const userFound = await User.findOne({ email: user.email });

    if (userFound) {
      // Log to verify that the user is found successfully
      logInfo(`User found: ${JSON.stringify(userFound)}`);

      // Antes de la comparación
      logInfo(`Password input: ${user.password}`);
      logInfo(`Stored password: ${userFound.password}`);

      const isPasswordValid =
        user.password.trim() === userFound.password.trim();

      // Después de la comparación
      logInfo(`Is password valid? ${isPasswordValid}`);
      logInfo(`Length of input password: ${user.password.trim().length}`);
      logInfo(`Length of stored password: ${userFound.password.trim().length}`);
      logInfo(`Is password valid? ${isPasswordValid}`);

      if (isPasswordValid) {
        // Log to verify that the password is valid
        logInfo(`Password is valid for user: ${JSON.stringify(userFound)}`);

        const token = userFound.generateAuthToken();

        // Log to indicate that the user login was successful
        logInfo(`User login successful: ${JSON.stringify(userFound)}`);

        res.status(200).json({ success: true, msg: "Login successful", token });
      } else {
        // Log to verify that the password does not match
        logInfo(`Invalid password for user: ${JSON.stringify(userFound)}`);
        res.status(401).json({
          success: false,
          msg: "Invalid credentials - Incorrect password",
        });
      }
    } else {
      // Log to verify that no user is found for that email
      logInfo(`No user found for email: ${user.email}`);
      res
        .status(401)
        .json({ success: false, msg: "Invalid credentials - User not found" });
    }
  } catch (error) {
    // Log to verify any internal errors
    logError(error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};
