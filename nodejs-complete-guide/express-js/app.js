import bodyParser from "body-parser";
import express from "express";

import { adminRoutes } from "./routes/admin.js";
import { errorRoute } from "./routes/error.js";
import { shopRoutes } from "./routes/shop.js";

const app = express();

app.use(adminRoutes);
app.use(shopRoutes);
app.use(errorRoute);

app.use(bodyParser.urlencoded());

app.listen(3000);
