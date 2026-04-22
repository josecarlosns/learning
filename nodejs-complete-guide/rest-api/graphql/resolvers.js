import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

import { PostModel } from "../models/posts.js";
import { UserModel } from "../models/user.js";
import { getError, isEmptyObject, isEmptyString } from "../utils/jsUtils.js";

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
    if (!req.isAuth || !req.userId)
      throw getError({
        message: "Not Authenticated",
        code: 401,
      });

    const { title, content, imageUrl } = args.postInput;
    const { userId } = req;
    const errors = [];

    if (validator.isEmpty(title) || !validator.isLength(title, { min: 5 }))
      errors.push("Invalid title");
    if (validator.isEmpty(content) || !validator.isLength(content, { min: 5 }))
      errors.push("Invalid content");

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

    user.posts.push(createdPost._id);
    await user.save();

    return createdPost.toJSON();
  },

  posts: async (args, req) => {
    if (!req.isAuth || !req.userId)
      throw getError({
        message: "Not Authenticated",
        code: 401,
      });

    const { page, limit } = args;
    const skip = ((page || 1) - 1) * (limit || 10);

    const totalPosts = await PostModel.find().countDocuments();
    const posts = await PostModel.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("author", " _id name email");

    const result = {
      totalPosts,
      posts: posts.map((post) => post.toJSON()),
    };

    return result;
  },

  post: async (args, req) => {
    if (!req.isAuth || !req.userId)
      throw getError({
        message: "Not Authenticated",
        code: 401,
      });

    const { id } = args;

    const post = await PostModel.findById(id).populate(
      "author",
      "_id name email"
    );

    if (isEmptyObject(post))
      throw getError({
        message: "Post not found",
        statusCode: 404,
        payload: {
          id,
        },
      });

    return post.toJSON();
  },

  updatePost: async (args, req) => {
    if (!req.isAuth || !req.userId)
      throw getError({
        message: "Not Authenticated",
        code: 401,
      });

    const { id, updatePostInput } = args;
    const { title, content, imageUrl } = updatePostInput;

    const post = await PostModel.findById(id).populate(
      "author",
      "_id name email"
    );
    if (isEmptyObject(post))
      throw getError({
        message: "Post not found",
        statusCode: 404,
        payload: {
          id,
        },
      });
    if (post.author._id.toString() !== req.userId.toString())
      throw getError({
        message: "Unauthorized",
        statusCode: 401,
      });

    if (!isEmptyString(title)) post.title = title;
    if (!isEmptyString(content)) post.content = content;
    if (!isEmptyString(imageUrl)) post.imageUrl = imageUrl;

    const updatedPost = await post.save();

    return updatedPost.toJSON();
  },

  deletePost: async (args, req) => {
    if (!req.isAuth || !req.userId)
      throw getError({
        message: "Not Authenticated",
        code: 401,
      });

    const { id } = args;

    const post = await PostModel.findById(id).populate(
      "author",
      "_id name email"
    );
    if (isEmptyObject(post))
      throw getError({
        message: "Post not found",
        statusCode: 404,
        payload: {
          id,
        },
      });
    if (post.author._id.toString() !== req.userId.toString())
      throw getError({
        message: "Unauthorized",
        statusCode: 401,
      });

    const deletedPost = await post.deleteOne();
    if (deletedPost.deletedCount === 1) {
      const user = await UserModel.findById(req.userId);
      user.posts = user.posts.filter(
        (userPost) => userPost._id.toString() !== post._id.toString()
      );

      await user.save();
    }

    return post.toJSON();
  },
};

export { graphqlResolver };
