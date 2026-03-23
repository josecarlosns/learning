import express from "express";

const errorRoute = express.Router();

errorRoute.use((req, res, next) => {
  res.status(404).send(`
    <h1>Page not found</h1>
  `);
});

export { errorRoute };
