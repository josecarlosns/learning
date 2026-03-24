import bodyParser from "body-parser";
import express from "express";

import { feedRoutes } from "./routes/feed.js";

const app = express();

app.use(bodyParser.json());

app.use((_, res, next) => {
  res.setHeaders(
    new Headers({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    })
  );

  next();
});

app.use("/feed", feedRoutes);

app.listen(8080);
