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
      // Log para verificar que el usuario se encuentra exitosamente
      logInfo(`User found: ${JSON.stringify(userFound)}`);

      // Antes de la comparación
      logInfo(`Password input: ${user.password}`);
      logInfo(`Stored password: ${userFound.password}`);

      const isPasswordValid =
        user.password.trim() === userFound.password.trim();

      // Después de la comparación
      logInfo(`Is password valid? ${isPasswordValid}`);

      if (isPasswordValid) {
        // Log para verificar que la contraseña es válida
        logInfo(`Password is valid for user: ${JSON.stringify(userFound)}`);

        const token = userFound.generateAuthToken();
        logInfo(
          `Generated Auth Token for User: ${userFound.email}, Token: ${token}`
        );

        // Log para indicar que la respuesta se está enviando al cliente

        logInfo(
          `Sending response to client: success=${true}, msg=${"Login successful"}, token=${token}`
        );

        // Enviar la respuesta al cliente
        res.status(200).json({ success: true, msg: "Login successful", token });
      } else {
        // Log para verificar que la contraseña no coincide
        logInfo(`Invalid password for user: ${JSON.stringify(userFound)}`);
        res.status(401).json({
          success: false,
          msg: "Invalid credentials - Incorrect password",
        });
      }
    } else {
      // Log para verificar que no se encuentra ningún usuario para ese correo electrónico
      logInfo(`No user found for email: ${user.email}`);
      res
        .status(401)
        .json({ success: false, msg: "Invalid credentials - User not found" });
    }
  } catch (error) {
    // Log para verificar cualquier error interno
    logError(error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};
