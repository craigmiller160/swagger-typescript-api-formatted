#!/usr/bin/env node
const { doGenerateApi } = require('../lib');

doGenerateApi(process.env[2], process.env[3]);