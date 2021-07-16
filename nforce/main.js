const nforce = require('nforce');
const process = require('process');
const SalesForceFactory = require('./sales-force-factory');

const factory = SalesForceFactory.forEnvironment(process.env.NODE_ENV);
const org = factory.createConnection('http://localhost:3000/oauth/_callback');
org
  .authenticate(factory.authenticationOptions())
  .then((oauth) => org.createStreamClient({ oauth }))
  .then((client) => {
    const accs = client.subscribe({
      isEvent: true,
      topic: 'ExpenseCRUD__e',
      replayId: -2,
      // topic: 'bogus',
    });

    accs.on('error', (err) => {
      console.log('Subscription failed', err);
      client.disconnect();
    });

    accs.on('data', (data) => {
      console.log('Received event: ', data);
    });
  });
