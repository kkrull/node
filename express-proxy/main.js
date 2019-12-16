const express = require('express');

const bindHost = '127.0.0.1';
const bindPort = 3000;

const app = express();
app.get('/hello', (req, res) => {
  res.send('Hello World');
});

app.listen(bindPort, bindHost, () => {
  console.log(`Listening on http://${bindHost}:${bindPort}`);
});
