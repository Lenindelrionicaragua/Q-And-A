import { logError } from "../../util/logging.js";
import validationErrorMessage from "../../util/validationErrorMessage.js";
import { validateUser } from "../../models/User.js";
import User from "../../models/User.js";
import InvitationCode from "../../models/InvitationCode.js";

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
