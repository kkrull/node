const nforce = require('nforce');
const path = require('path');
const process = require('process');

function loadEnvironmentSettings(environment) {
  const envPath = path.join(__dirname, `.env.${environment}`);
  console.log(`Loading environment settings: ${envPath}`);
  require('dotenv').config({
    path: envPath,
  });
}

loadEnvironmentSettings(process.env.NODE_ENV);

const clientId = process.env['CLIENT_ID'];
const clientSecret = process.env['CLIENT_SECRET'];
const redirectUri = 'http://localhost:3000/oauth/_callback';

console.log(`Connecting to SalesForce with client: ${clientId}`);
const org = nforce.createConnection({
  authEndpoint:
    'https://8thlight-dev-ed.my.salesforce.com/services/oauth2/authorize',
  clientId,
  clientSecret,
  redirectUri,
});

const username = process.env['USERNAME'];
const password = process.env['PASSWORD'];
const securityToken = process.env['SECURITY_TOKEN'];

console.log(`Authenticating with user: ${username}`);
org.authenticate(
  { username, password, securityToken },
  function (err, response) {
    console.log('[Connection#authenticate]', err, response);
  }
);
