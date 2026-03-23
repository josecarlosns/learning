import express from "express";

import { getPath } from "../utils/paths.js";

const errorRoute = express.Router();

errorRoute.use((req, res, next) => {
  res.status(404).sendFile(getPath("views", "404.html"));
});

export { errorRoute };
