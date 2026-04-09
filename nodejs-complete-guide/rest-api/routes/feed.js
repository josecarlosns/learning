import express from "express";
import { body } from "express-validator";

import {
  createPost,
  deletePostById,
  getPostById,
  getPosts,
  updatePostById,
} from "../controllers/feed.js";
import { checkAuth } from "../middleware/auth.js";

const feedRoutes = express.Router();

feedRoutes.get("/posts", checkAuth, getPosts);
feedRoutes.post(
  "/posts",
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  checkAuth,
  createPost
);
feedRoutes.get("/posts/:postId", getPostById);
feedRoutes.put("/posts/:postId", checkAuth, updatePostById);
feedRoutes.delete("/posts/:postId", checkAuth, deletePostById);

export { feedRoutes };
