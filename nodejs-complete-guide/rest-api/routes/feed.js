import express from "express";
import { getPosts } from "../controllers/feed";

const feedRoutes = express.Router();

feedRoutes.get("/posts", getPosts);

export { feedRoutes };
