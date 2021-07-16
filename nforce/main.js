const process = require('process');
const sforce = require('sforcejs');
const SalesForceFactory = require('./sales-force-factory');

const factory = SalesForceFactory.forEnvironment(process.env.NODE_ENV);
const org = factory.createConnection('http://localhost:3000/oauth/_callback');
org
  .authenticate(factory.authenticationOptions())
  .then((oauth) => org.createStreamClient({ oauth }))
  .then((client) => {
    const accs = client.subscribe({
      channel: '/data/Expense__ChangeEvent',
      isCDC: true,
      // isEvent: true,
      replayId: -2,
    });

    accs.on('error', (err) => {
      console.log('Subscription failed', err);
      client.disconnect();
    });

    accs.on('data', (data) => {
      console.log('Received event: ', JSON.stringify(data, null, 2));
    });
  });
