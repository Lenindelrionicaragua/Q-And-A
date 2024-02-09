import User, { validateUser } from "../models/User.js";
import { logError, logInfo } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
import InvitationCode from "../models/InvitationCode.js";

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
