#!/usr/bin/env node
const { doGenerateApi } = require('../lib');

// Needed to support locally running self-signed certs
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

if(process.argv.length < 5) {
    throw new Error('Must specify three arguments: the name of the API, the swagger url, and the output file');
}

doGenerateApi(process.argv[2], process.argv[3], process.argv[4]);