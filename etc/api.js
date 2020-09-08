'use strict';

const bots = require('..');
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);

app.get('/', (req, res) => res.redirect('/karl'));
app.get(`/:voice`, (req, res) => {
  let text = bots[req.params.voice].sentences(1);

  if (req.query.topic) {
    if (bots[req.params.voice]._source.includes(req.query.topic)) {
      while (!text.includes(req.query.topic)) {
        text = bots[req.params.voice].sentences(1);
      }
    }
  }

  res.send(text);
});

server.listen(process.env.PORT || 3000);
