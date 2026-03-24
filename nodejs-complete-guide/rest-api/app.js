import express from "express";
import { feedRoutes } from "./routes/feed.js";

const app = express();

app.use(feedRoutes);

app.listen(8080);
