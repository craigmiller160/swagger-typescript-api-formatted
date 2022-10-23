#!/usr/bin/env node
const { doGenerateApi } = require('../lib');

if(process.argv.length < 4) {
    throw new Error('Must specify two arguments: the name and url');
}

doGenerateApi(process.argv[2], process.argv[3]);