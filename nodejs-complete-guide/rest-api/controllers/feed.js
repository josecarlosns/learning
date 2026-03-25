import { validationResult } from "express-validator";

import { DUMMY_POSTS } from "../data/dummyData.js";
import { PostModel } from "../models/posts.js";
import { isEmptyObject } from "../utils/jsUtils.js";

const posts = [...DUMMY_POSTS];

export async function getPosts(_, res) {
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

export async function getPost(req, res) {
  const { postId } = req.params;
  try {
    const foundPost = await PostModel.findById(postId);

    if (isEmptyObject(foundPost)) {
      const error = new Error("Post not found");
      error.statusCode = 404;

      throw error;
    }

    res.status(200).json({
      message: "Post fetched successfully",
      payload: { post: foundPost },
    });
  } catch (error) {
    const newError = new Error("Error searching for post", { cause: error });
    newError.statusCode = error.statusCode || 500;
    newError.payload = {
      error,
    };

    throw newError;
  }
}
