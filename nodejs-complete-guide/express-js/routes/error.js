import express from "express";
import path from "path";

import { __dirname } from "../utils/paths.js";

const errorRoute = express.Router();

errorRoute.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "..", "views", "404.html"));
});

export { errorRoute };
