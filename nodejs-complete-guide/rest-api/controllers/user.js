import { hash } from "bcryptjs";

import { UserModel } from "../models/user.js";
import { isEmptyObject } from "../utils/jsUtils.js";
import { checkValidationErrors } from "./utils.js";

async function login(req, res, next) {}

async function signup(req, res, next) {
  const { email, password, name } = req.body;
  checkValidationErrors(req, { email, password, name });

  try {
    const userExists = await UserModel.findOne({ $or: [{ email }, { name }] });

    if (!isEmptyObject(userExists)) throw new Error("User already exists");

    const hashedPasswd = await hash(password, 12);

    const newUser = new UserModel({
      email,
      name,
      password: hashedPasswd,
    });

    const savedUser = await newUser.save();

    return res
      .status(201)
      .json({ message: "UserCreated", payload: { userId: savedUser._id } });
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500;
    next(error);
  }
}

export { login, signup };
