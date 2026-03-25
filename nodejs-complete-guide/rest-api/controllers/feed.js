import { validationResult } from "express-validator";

import { DUMMY_POSTS } from "../data/dummyData.js";
import { PostModel } from "../models/posts.js";

const posts = [...DUMMY_POSTS];

export async function getPosts(req, res) {
  const posts = res.status(200).json({
    payload: { posts },
  });
}

export async function createPost(req, res) {
  const errors = validationResult(req);

  const hasErrors = errors && !errors.isEmpty();
  if (hasErrors) {
    const validationError = new Error("Validation error on createPost", {
      cause: errors,
    });
    validationError.statusCode = 422;

    throw validationError;
  }

  const { title, author, content } = req.body;

  const newPost = new PostModel({
    title,
    author,
    content,
  });

  try {
    const savedPost = await newPost.save();
    posts.push(savedPost.toJSON());

    res.status(201).json({
      message: "Post Created Successfully",
      paylload: {
        post: savedPost,
      },
    });
  } catch (error) {
    const hasNoStatusCode = !error.statusCode;
    if (hasNoStatusCode) error.statusCode = 500;

    throw error;
  }
}
