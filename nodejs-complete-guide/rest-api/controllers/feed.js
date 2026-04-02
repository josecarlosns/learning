import { DUMMY_POSTS } from "../data/dummyData.js";
import { PostModel } from "../models/posts.js";
import { isEmptyObject, isNullOrUndefined } from "../utils/jsUtils.js";
import { checkValidationErrors, deleteImage } from "./utils.js";

const posts = [...DUMMY_POSTS];

export async function getPosts(_, res) {
  const posts = await PostModel.find();

  if (isEmptyObject(posts)) throw new Error("Error fetching posts");

  return res.status(200).json({
    message: "Posts fetched successfully",
    payload: {
      posts,
    },
  });
}

export async function createPost(req, res) {
  checkValidationErrors(req);

  const hasNoImageFile = !req.file;
  if (hasNoImageFile) {
    const error = new Error("No Image Provided");
    error.statusCode = 422;

    throw error;
  }

  const { title, author, content, date } = req.body;
  const image = req.file.path;

  const newPost = new PostModel({
    title,
    author,
    content,
    date,
    image,
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

export async function getPostById(req, res) {
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

export async function updatePostById(req, res) {
  checkValidationErrors(req);

  const { postId } = req.params;
  const data = req.body;

  try {
    const { title, content, author, date } = data;
    const image = !isEmptyObject(req.file) ? req.file.path : data.image;

    const post = await PostModel.findById(postId);
    if (isEmptyObject(post)) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      error.payload = { postId };

      throw error;
    }

    if (!isNullOrUndefined(title)) post.title = title;
    if (!isNullOrUndefined(content)) post.content = content;
    if (!isNullOrUndefined(author)) post.author = author;
    if (!isNullOrUndefined(date)) post.date = date;
    if (image !== post.image) {
      if (!isNullOrUndefined(post.image)) await deleteImage(post.image);
      post.image = image;
    }

    const result = await post.save();

    return res.status(200).json({
      message: "Post updated succcessfully!",
      payload: { post: result },
    });
  } catch (error) {
    const newError = new Error("Error updating post", { cause: error });
    newError.statusCode = error.statusCode || 500;
    newError.payload = {
      error,
      postId,
      data,
    };

    throw newError;
  }
}
