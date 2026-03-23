import express from "express";
import path from "path";

import { __dirname } from "../utils/paths.js";

const adminRoutes = express.Router();

adminRoutes.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "views", "add-product.html"));
});

adminRoutes.post("/add-product", (req, res, next) => {
  const { title } = req.body;

  res.send(`
    <div>
    <h1>Title: ${title}</h1>
    </div>
  `);
});

export { adminRoutes };
