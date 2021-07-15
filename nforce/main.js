const nforce = require('nforce');
const path = require('path');
const process = require('process');

const envName = path.join(__dirname, `.env.${process.env.NODE_ENV}`);
console.log(`Loading environment settings: ${envName}`);
require('dotenv').config({
  path: path.join(__dirname, `.env.${process.env.NODE_ENV}`),
});

console.log('Connecting to SalesForce:', {
  clientId: process.env['CLIENT_ID'],
  clientSecret: process.env['CLIENT_SECRET'],
});

// const org = nforce.createConnection({
//   clientId: '',
//   clientSecret: '',
//   redurectUri: '',
// });
