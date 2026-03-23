import express from "express";
import path from "path";

import { __dirname } from "../utils/paths.js";

const shopRoutes = express.Router();

shopRoutes.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "views", "shop.html"));
});

export { shopRoutes };
