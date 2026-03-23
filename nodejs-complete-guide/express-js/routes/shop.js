import express from "express";

const shopRoutes = express.Router();

shopRoutes.get("/", (req, res, next) => {
  res.send(`
    <h1>Hello from Express!</h1>
  `);
});

export { shopRoutes };
