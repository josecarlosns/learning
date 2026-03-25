import bodyParser from "body-parser";
import express from "express";

import mongoose from "mongoose";
import { feedRoutes } from "./routes/feed.js";
import { getPath } from "./utils/jsUtils.js";

const app = express();

app.use(bodyParser.json());
app.use("/images", express.static(getPath("images")));

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

app.use((error, _, res, _) => {
  const statusCode = error.statusCode || 500;
  const message = error.message;

  res.status(statusCode).json({
    message,
    payload: { error },
  });
});

mongoose
  .connect(
    "mongodb://admin:pass123@localhost:27017/restapidb?authSource=admin&directConnection=true"
  )
  .then(() => {
    console.log("Connected to database successfully");

    app.listen(8080);
  })
  .catch((err) => {
    console.log("Error connecting to db: ", err);
  });
