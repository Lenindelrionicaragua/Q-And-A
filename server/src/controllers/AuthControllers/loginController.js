import { logInfo } from "../../util/logging.js";
import validationErrorMessage from "../../util/validationErrorMessage.js";
import User from "../../models/User.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  const { user } = req.body;

  // Validation Errors

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
        res.status(200).json({
          success: true,
          msg: "Login successful",
          user: {
            id: userFound._id,
            email: userFound.email,
            name: userFound.name,
          },
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
