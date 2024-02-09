import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validateAllowedFields from "../util/validateAllowedFields.js";
import { logInfo } from "../util/logging.js";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  invitationCode: { type: String, required: true },
});

export const validateUser = (
  userObject,
  requirePassword = true,
  requireName = true,
  requireEmail = true,
  requireInvitationCode = true
) => {
  const errorList = [];
  const allowedKeys = ["name", "email", "password", "invitationCode"];

  const validatedKeysMessage = validateAllowedFields(userObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (requireName && userObject.name == null) {
    errorList.push("name is a required field");
    logInfo("user Create Validation failed: Name is required");
  }

  if (requireEmail && userObject.email == null) {
    errorList.push("email is a required field");
    logInfo("User create Validation failed: Email is required");
  }

  if (requirePassword && userObject.password == null) {
    errorList.push("password is a required field");
    logInfo("User create Validation failed: Password is required");
  }
  if (requireInvitationCode && userObject.invitationCode == null) {
    errorList.push("invitationCode is a required field");
    logInfo("User create Validation failed: Invitation Code is required");
  }

  return errorList;
};

userSchema.pre("save", async function (next) {
  // Hash the password before saving to the database
  if (this.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);

      // Log to verify that the password is hashed successfully
      logInfo(`Password hashed successfully for user: ${this.email}`);

      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const User = mongoose.model("user", userSchema);

export default User;
