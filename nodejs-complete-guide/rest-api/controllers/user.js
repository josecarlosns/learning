import { compare, hash } from "bcryptjs";

import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.js";
import { isEmptyObject } from "../utils/jsUtils.js";
import { checkValidationErrors } from "./utils.js";

const BASEPATH = "/auth";

async function signup(req, res, next) {
  const { email, password, name } = req.body;
  checkValidationErrors({
    req,
    path: `${BASEPATH}/signup`,
    payload: { email, password, name },
  });

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

async function login(req, res, next) {
  const { email, password } = req.body;

  const user = await UserModel.findOne({
    email,
  });
  if (isEmptyObject(user)) throw new Error("User Not Found");

  const isCorrectPasswd = await compare(password, user.password);
  if (!isCorrectPasswd) throw new Error("Wrong password");

  const token = jwt.sign(
    { email: user.email, userId: user._id.toString() },
    "secret",
    { expiresIn: "1h" }
  );

  return res.status(200).json({
    message: "Login successful",
    payload: {
      token,
    },
  });
}
4;
export { login, signup };
