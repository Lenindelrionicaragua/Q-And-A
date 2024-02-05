import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import validateAllowedFields from "../util/validateAllowedFields.js";
import { logInfo } from "../util/logging.js";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
});

export const validateUser = (
  userObject,
  requirePassword = true,
  requireName = true,
  requireEmail = true
) => {
  const errorList = [];
  const allowedKeys = ["name", "email", "password"];

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

userSchema.methods.generateAuthToken = function () {
  // Generate a session token for the user
  logInfo(`JWT_SECRET: ${process.env.JWT_SECRET}`);
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const User = mongoose.model("user", userSchema);

export default User;
