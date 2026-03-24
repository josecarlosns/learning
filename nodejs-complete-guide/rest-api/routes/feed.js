import express from "express";
import { getPosts } from "../controllers/feed.js";

const feedRoutes = express.Router();

feedRoutes.get("/posts", getPosts);

export { feedRoutes };
