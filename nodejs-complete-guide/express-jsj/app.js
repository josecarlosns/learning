const http = require('http');
const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('in the minddelware without the next function');

  res.json({
    number: 123.5,
    boolean: true,
    msg: 'Hello world!'
  });
});

const server = http.createServer(app);

server.listen(3000);
