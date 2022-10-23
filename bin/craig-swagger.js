#!/usr/bin/env node
const { doGenerateApi } = require('../lib');

doGenerateApi(process.argv[2], process.argv[3]);