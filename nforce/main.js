const nforce = require('nforce');
const process = require('process');
const SalesForceFactory = require('./sales-force-factory');

const factory = SalesForceFactory.forEnvironment(process.env.NODE_ENV);
const org = factory.createConnection('http://localhost:3000/oauth/_callback');
org
  .authenticate(factory.authenticationOptions())
  .then((oauth) => org.createStreamClient({ oauth }))
  .then((client) => {
    console.log('client', client);

    //TODO KDK: Crete a subscription for the event topic and add node.js event handlers
    // const accs = client.subscribe({});
  });
