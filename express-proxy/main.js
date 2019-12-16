const express = require('express');
const proxy = require('express-http-proxy');
const morgan = require('morgan');

const bindHost = '127.0.0.1';
const bindPort = 3000;

const app = express();
app.get('/hello', (req, res) => {
  res.send('Hello World');
});

app.use(morgan('combined'));
app.use('/api', proxy('http://dev.ghbeta.com:8950'));
app.use('/', proxy('http://localhost:5101'));

app.listen(bindPort, bindHost, () => {
  console.log(`Listening on http://${bindHost}:${bindPort}`);
});
