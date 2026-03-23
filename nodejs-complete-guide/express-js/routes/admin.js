import express from "express";

const adminRoutes = express.Router();

adminRoutes.get("/add-product", (req, res, next) => {
  res.send(`
    <form action="/product" method="POST">
    <input type="text" name="title"/>
    <button type="submit">Send</button>
    </form>
  `);
});

adminRoutes.post("/product", (req, res, next) => {
  res.redirect("/");
});

export { adminRoutes };
