'use strict';

const bots = require('..');
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);

app.get('/', (req, res) => res.redirect('/karl'));
app.get(`/:voice`, (req, res) => {
  res.send(bots[req.params.voice].sentences(1));
});

server.listen(process.env.PORT || 3000);
