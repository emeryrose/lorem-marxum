'use strict';

const bots = require('..');
const express = require('express');
const http = require('http');
const app = express();
// const SlackBot = require('./slack');
const server = http.createServer(app);

// const bot = new SlackBot(options.SlackToken, options.SlackSigningSecret,
//   options.BotVoice);

// app.use(`/${options.BotVoice}/slack/events`, bot.middleware());

app.get('/', (req, res) => res.redirect('/karl'));
app.get(`/:voice`, (req, res) => {
  res.send(bots[req.params.voice].sentences(1));
});

server.listen(process.env.PORT || 3000);
