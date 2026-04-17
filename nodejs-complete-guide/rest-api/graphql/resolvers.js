import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

import { PostModel } from "../models/posts.js";
import { UserModel } from "../models/user.js";
import { getError, isEmptyObject } from "../utils/jsUtils.js";

const graphqlResolver = {
  createUser: async (args, req) => {
    const { email, name, password } = args.userInput;
    const errors = [];

    if (!validator.isEmail(email)) errors.push("Invalid Email");

    if (
      validator.isEmpty(password) ||
      !validator.isLength(password, {
        min: 5,
      })
    )
      errors.push("Invalid password");

    if (errors.length > 0)
      throw getError({
        message: "Invalid Input",
        payload: {
          errors,
        },
      });

    const user = await UserModel.findOne({
      email,
    });

    if (!isEmptyObject)
      throw getError({
        message: "User already exists",
      });

    const hashPwd = await hash(password, 12);

    const newUser = new UserModel({ email, name, password: hashPwd });

    const createdUser = (await newUser.save()).toJSON();

    return {
      ...createdUser,
      _id: createdUser._id.toString(),
      password: undefined,
    };
  },

  login: async (args, req) => {
    const { email, password } = args;

    if (!validator.isEmail(email)) errors.push("Invalid Email");

    if (
      validator.isEmpty(password) ||
      !validator.isLength(password, {
        min: 5,
      })
    )
      errors.push("Invalid password");

    const user = await UserModel.findOne({
      email,
    });

    if (isEmptyObject(user))
      throw getError({
        message: "User not found",
        statusCode: 404,
        payload: {
          email,
        },
      });

    const isCorrectPassword = await compare(password, user.password);
    if (!isCorrectPassword)
      throw getError({
        message: "Incorrect password",
        statusCode: 401,
      });

    const userId = user._id.toString();
    const token = jwt.sign(
      {
        userId,
        email,
      },
      "secret",
      { expiresIn: "1h" }
    );

    return { userId, token };
  },

  createPost: async (args, req) => {
    const { title, content, imageUrl } = args.postInput;
    const { userId } = req;
    const errors = [];

    if (validator.isEmpty(title) || !validator.isLength(title, { min: 5 }))
      errors.push("Invalid title");
    if (validator.isEmpty(content) || !validator.isLength(content, { min: 5 }))
      errors.push("Invalid content");

    if (validator.isEmpty(userId)) errors.push("Unauthorized");

    if (errors.length > 0)
      throw getError({
        message: "Invalid Input",
        payload: {
          errors,
        },
      });

    const user = await UserModel.findById(req.userId);

    if (isEmptyObject(user))
      throw getError({
        message: "Logged user not found",
        payload: {
          userId,
        },
      });

    const newPost = new PostModel({
      title,
      content,
      imageUrl,
      date: new Date(),
      author: user._id,
    });
    const createdPost = await newPost.save();

    return createdPost.toJSON();
  },
};

export { graphqlResolver };
