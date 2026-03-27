import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";

import { DUMMY_POSTS } from "./data/dummyData.js";
import { PostModel } from "./models/posts.js";
import { feedRoutes } from "./routes/feed.js";
import { getPath } from "./utils/jsUtils.js";

const app = express();

app.use(bodyParser.json());
app.use("/images", express.static(getPath("images")));

app.use((req, res, next) => {
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

app.use((error, req, res, next) => {
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
  .then(async () => {
    console.log("Connected to database successfully");

    await PostModel.deleteMany();

    const postsModel = DUMMY_POSTS.map((post) => new PostModel(post));
    await PostModel.bulkSave(postsModel);

    app.listen(8080);
  })
  .catch((err) => {
    console.log("Error connecting to db: ", err);
  });
