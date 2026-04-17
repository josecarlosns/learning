import { hashSync } from "bcryptjs";
import bodyParser from "body-parser";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import multer from "multer";

import { DUMMY_POSTS, DUMMY_USERS } from "./data/dummyData.js";
import { graphqlResolver } from "./graphql/resolvers.js";
import { graphqlSchema } from "./graphql/schema.js";
import { PostModel } from "./models/posts.js";
import { UserModel } from "./models/user.js";
import { feedRoutes } from "./routes/feed.js";
import { userRoutes } from "./routes/user.js";
import { initSocket } from "./socket.js";
import { getPath } from "./utils/jsUtils.js";

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
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
app.use("/auth", userRoutes);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
  })
);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message;

  res.status(statusCode).json({
    message,
    ...error,
  });
});

mongoose
  .connect(
    "mongodb://admin:pass123@localhost:27017/restapidb?authSource=admin&directConnection=true"
  )
  .then(async () => {
    await PostModel.deleteMany();
    await UserModel.deleteMany();

    const users = DUMMY_USERS.map((user) => {
      const { password } = user;
      const hashedPassword = hashSync(password, 12);
      const newUser = new UserModel({
        ...user,
        password: hashedPassword,
        status: "NEW",
      });

      return newUser;
    });
    await UserModel.bulkSave(users);

    const posts = DUMMY_POSTS.map((post) => {
      const { author } = post;
      const authorUser = users.find((user) => user.name === author);

      const newPost = new PostModel({ ...post, author: authorUser });

      return newPost;
    });
    await PostModel.bulkSave(posts);

    const server = app.listen(8080);
    const io = initSocket(server);

    io.on("connection", (socket) => {
      console.log("connected");
    });
  })
  .catch((err) => {
    console.log("Error connecting to db: ", err);
  });
