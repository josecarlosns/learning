const http = require('http');
const express = require('express');

const app = express();

app.use('/me', (req, res, next) => {
  res.json({
    name: 'Jose',
    surname: 'Silva'
  });
});

app.use('/', (req, res, next) => {
  res.json({
    number: 123.5,
    boolean: true,
    msg: 'Hello world!'
  });
});

app.listen(3000);
