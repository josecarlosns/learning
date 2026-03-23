const http = require('http');
const express = require('express');

const app = express();

app.use('/add-product', (req, res, next) => {
  res.send(`
    <form action="/product" method="post">
    <input type="text" />
    <button type="submit">Send</button>
    </form>
  `);
});

app.use('/product', (req, res, next) => {
  res.redirect('/');
});

app.use('/', (req, res, next) => {
  res.send(`
    <h1>Hello from Express!</h1>
  `);
});

app.listen(3000);
