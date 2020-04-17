'use strict';

const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();
const SlackBot = require('./slack');
const config = JSON.parse(fs.readFileSync(process.argv[2]).toString());
const server = https.createServer({
  cert: fs.readFileSync(config.ServerCertificate),
  key: fs.readFileSync(config.ServerPrivateKey)
}, app);

config.Bots.forEach(options => {
  const bot = new SlackBot(options.SlackToken, options.SlackSigningSecret,
    options.BotVoice);

  app.use(`/${options.BotVoice}/slack/events`, bot.middleware());
  app.get(`/${options.BotVoice}`, (req, res) => {
    let text;

    if (req.query.sentences) {
      text = bot._lorem.sentences(parseInt(req.query.sentences));
    } else if (req.query.words) {
      text = bot._lorem.words(parseInt(req.query.words));
    } else {
      text = bot._lorem.all();
    }

    res.send(text);
  });
})

server.listen(443);
