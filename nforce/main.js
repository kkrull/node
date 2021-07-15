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
console.log(`Connecting to SalesForce with client: ${clientId}`);

// const org = nforce.createConnection({
//   clientId: '',
//   clientSecret: '',
//   redurectUri: '',
// });
