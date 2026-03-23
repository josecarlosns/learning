import express from "express";

import { getPath } from "../utils/paths.js";

const adminRoutes = express.Router();

adminRoutes.get("/add-product", (req, res, next) => {
  res.sendFile(getPath("views", "add-product.html"));
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
