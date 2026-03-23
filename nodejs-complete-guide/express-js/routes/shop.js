import express from "express";

import { getPath } from "../utils/paths.js";

const shopRoutes = express.Router();

shopRoutes.get("/", (req, res, next) => {
  res.sendFile(getPath("views", "shop.html"));
});

export { shopRoutes };
