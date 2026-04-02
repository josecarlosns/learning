import express from "express";
import { body } from "express-validator";

import {
  createPost,
  deletePostById,
  getPostById,
  getPosts,
  updatePostById,
} from "../controllers/feed.js";

const feedRoutes = express.Router();

feedRoutes.get("/posts", getPosts);
feedRoutes.post(
  "/posts",
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
    body("author").trim().isLength({ min: 5 }),
  ],
  createPost
);
feedRoutes.get("/posts/:postId", getPostById);
feedRoutes.put("/posts/:postId", updatePostById);
feedRoutes.delete("/posts/:postId", deletePostById);

export { feedRoutes };
