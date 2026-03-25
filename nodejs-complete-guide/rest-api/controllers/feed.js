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
  if (hasErrors)
    return res.status(422).json({
      message: "Validation failed",
      errors: errors.array(),
    });

  const { title, author, content } = req.body;

  const newPost = new PostModel({
    title,
    author,
    content,
  });

  try {
    const savedPost = await newPost.save();
    posts.push(savedPost.toJSON());

    console.log(`Post "${title}" created successfully!`);

    res.status(201).json({
      message: "Post Created Successfully",
      paylload: {
        post: savedPost,
      },
    });
  } catch (error) {
    console.log("DB error:", error);

    res.status(422).json({
      message: "Error saving Post on DB",
      payload: {
        error,
      },
    });
  }
}
