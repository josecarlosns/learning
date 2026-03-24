import bodyParser from "body-parser";
import express from "express";

import { feedRoutes } from "./routes/feed.js";

const app = express();

app.use(bodyParser.json());

app.use(feedRoutes);

app.listen(8080);
