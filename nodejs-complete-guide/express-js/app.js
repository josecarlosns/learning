import bodyParser from "body-parser";
import express from "express";

import { adminRoutes } from "./routes/admin.js";
import { errorRoute } from "./routes/error.js";
import { shopRoutes } from "./routes/shop.js";

const app = express();
app.use(bodyParser.urlencoded());

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorRoute);

app.listen(3000);
