import express from "express";
import { createPost, getPosts } from "../controllers/feed.js";

const feedRoutes = express.Router();

feedRoutes.get("/posts", getPosts);
feedRoutes.post("/posts", createPost);

export { feedRoutes };
