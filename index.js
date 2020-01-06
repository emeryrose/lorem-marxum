#!/usr/bin/env sh
':' //; exec "$(command -v nodejs || command -v node)" "$0" "$@"

/* eslint strict: 0 */ // eslint doesn't like our hack above

'use strict';

const program = require('commander');
const fs = require('fs');
const path = require('path');


class Generator {

  constructor() {
    this._source = fs.readFileSync(path.join(__dirname, 'source.txt'))
      .toString('utf8');
    this._parts = this._source.match(/[^\.!\?]+[\.!\?]+/g).map(s => s.trim());
  }

  words(n) {
    const res = [];

    while (res.length < n) {
      let sentence = this.sentences(1);
      let words = sentence.split(' ');

      words.pop();

      for (let word of words) {
        if (res.length < n) {
          res.push(word.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, ''));
        }
      }
    }

    return res.join(' ');
  }

  sentences(n) {
    const src = this._parts.slice();
    const res = [];

    while (res.length < n) {
      res.push(src.splice(Math.floor(Math.random() * src.length), 1));
    }

    return res.join(' ');
  }

  all() {
    return this._source.toString();
  }

}

if (require.main === module) {
  program.version(require('./package'));
  program.description('a dummy text generator for the people ☭');
  program.option('-w, --words <n>', 'number words to generate');
  program.option('-s, --sentences <n>', 'number sentences to generate');
  program.option('-a, --all');
  program.parse(process.argv);

  const generator = new Generator();

  if (program.all) {
    process.stdout.write(generator.all());
  } else if (program.words) {
    process.stdout.write(generator.words(parseInt(program.words)));
  } else if (program.sentences) {
    process.stdout.write(generator.sentences(parseInt(program.sentences)));
  } else {
    program.help();
  }
} else {
  module.exports = new Generator();
}
