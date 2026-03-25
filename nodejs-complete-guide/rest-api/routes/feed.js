import express from "express";
import { body } from "express-validator";

import { createPost, getPosts } from "../controllers/feed.js";

const feedRoutes = express.Router();

feedRoutes.get("/posts", getPosts);
feedRoutes.post(
  "/posts",
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  createPost
);

export { feedRoutes };
