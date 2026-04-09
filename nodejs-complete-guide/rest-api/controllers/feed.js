import { DUMMY_POSTS } from "../data/dummyData.js";
import { PostModel } from "../models/posts.js";
import {
  getError,
  isEmptyObject,
  isNullOrUndefined,
} from "../utils/jsUtils.js";
import { checkValidationErrors, deleteImage } from "./utils.js";

const posts = [...DUMMY_POSTS];

export async function getPosts(req, res) {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;

  const posts = await PostModel.find().skip(skip).limit(limit);
  const totalPosts = await PostModel.countDocuments();

  if (isEmptyObject(posts))
    throw getError({ message: "Error fetching posts", statusCode: 500 });

  return res.status(200).json({
    message: "Posts fetched successfully",
    payload: {
      totalPosts,
      posts,
    },
  });
}

export async function createPost(req, res) {
  checkValidationErrors({ req, path: "/feed" });

  const hasNoImageFile = !req.file;
  if (hasNoImageFile) {
    const error = getError({
      message: "No image provided",
      statusCode: 422,
    });

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

  const savedPost = await newPost.save();
  posts.push(savedPost.toJSON());

  res.status(201).json({
    message: "Post Created Successfully",
    paylload: {
      post: savedPost,
    },
  });
}

export async function getPostById(req, res) {
  const { postId } = req.params;
  const foundPost = await PostModel.findById(postId);

  if (isEmptyObject(foundPost)) {
    const error = getError({
      message: "Post not found",
      statusCode: 404,
      payload: { postId },
    });
    throw error;
  }

  res.status(200).json({
    message: "Post fetched successfully",
    payload: { post: foundPost },
  });
}

export async function updatePostById(req, res) {
  checkValidationErrors({ req, path: "/feed" });

  const { postId } = req.params;
  const data = req.body;

  const { title, content, author, date } = data;
  const image = !isEmptyObject(req.file) ? req.file.path : data.image;

  const post = await PostModel.findById(postId);
  if (isEmptyObject(post)) {
    const error = getError({
      message: "Post not found",
      statusCode: 404,
      payload: { postId },
    });

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
}

export async function deletePostById(req, res) {
  checkValidationErrors({ req, path: "/feed" });

  const { postId } = req.params;

  const post = await PostModel.findByIdAndDelete(postId);
  if (!isEmptyObject(post)) {
    if (!isNullOrUndefined(post.image)) deleteImage(post.image);

    return res.status(200).json({
      message: "Post deleted succcessfully!",
      payload: { post },
    });
  } else
    throw getError({
      message: "Post not found",
      statusCode: 404,
      payload: { postId },
    });
}
