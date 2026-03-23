import express from "express";

const adminRoutes = express.Router();

adminRoutes.get("/add-product", (req, res, next) => {
  res.send(`
    <form action="/admin/add-product" method="POST">
    <input type="text" name="title"/>
    <button type="submit">Send</button>
    </form>
  `);
});

adminRoutes.post("/add-product", (req, res, next) => {
  const { title } = req.body;

  res.send(`
    <div>
    <h1>Title: ${title}</h1>
    </div>
  `);
});

export { adminRoutes };
