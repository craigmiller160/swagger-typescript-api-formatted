#!/usr/bin/env node
const { doGenerateApi } = require('../lib');

// Needed to support locally running self-signed certs
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

if(process.argv.length < 4) {
    throw new Error('Must specify two arguments: the name and url');
}

doGenerateApi(process.argv[2], process.argv[3]);