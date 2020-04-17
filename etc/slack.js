'use strict';

const shuffle = require('knuth-shuffle').knuthShuffle;
const fs = require('fs');
const lorem = require('../index');
const { WebClient } = require('@slack/web-api');
const { createEventAdapter } = require('@slack/events-api');


class SlackBot {

  static get TRIGGERS() {
    return {
      karl: [
        'healthcare',
        'tuition',
        'debt',
        'capitalism',
        'landlord',
        'money',
        'expensive',
        'rent',
        'karl',
        'marx',
        'mortgage',
        'billionaire',
        'one percent',
        'business',
        'commercial',
        'alienation',
        'workers',
        'real estate',
        'investor',
        'economy',
        'communism',
      ],
      emma: [
        'women',
        'woman',
        'feminism',
        'patriarchy',
        'birth control',
        'roe v wade',
        'mansplain',
        'sex worker'
      ],
      all: [
        'homeless',
        'corporation',
        'rich',
        'property',
        'authoritarian',
        'bougie',
        'bourgeoisie',
        'education'
      ]
    };
  }

  constructor(slackToken, signingSecret, sourceVoice) {
    this._web = new WebClient(slackToken);
    this._events = createEventAdapter(signingSecret);
    this._lorem = lorem[sourceVoice];
    this._triggers = SlackBot.TRIGGERS[sourceVoice]
      .concat(SlackBot.TRIGGERS.all);
    this._lastTrigger = 0;

    this._listen();
  }

  _listen() {
    this._events.on('message', event => {
      for (let trigger of this._triggers){
        if (!event.text.toLowerCase().includes(trigger)) {
          continue;
        }

        return this.reply(event.channel, trigger);
      }
    });
    this._events.on('error', console.error);
  }

  async reply(channel, trigger) {
    if (Date.now() <= this._lastTrigger + 5000) {
      return;
    }

    let replies = [];

    for (let part of this._lorem._parts) {
      if (part.includes(trigger)) {
        replies.push(part);
      }
    }

    replies = shuffle(replies);

    if (!replies.length) {
      await this._web.chat.postMessage({
        channel,
        text: this._lorem.sentences(1)
      });
    } else {
      await this._web.chat.postMessage({
        channel,
        text: replies.pop()
      });
    }

    this._lastTrigger = Date.now();
  }

  middleware() {
    return this._events.expressMiddleware();
  }

}

module.exports = SlackBot;
