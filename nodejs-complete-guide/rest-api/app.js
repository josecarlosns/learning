import express from "express";
import { feedRoutes } from "./routes/feed";

const app = express();

app.use(feedRoutes);

app.listen(8080);
