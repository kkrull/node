const express = require('express');
const proxy = require('express-http-proxy');
const morgan = require('morgan');

class ProxyServer {
  constructor(host, port) {
    this.host = host;
    this.port = port;
  }

  listen() {
    const app = express();
    app.use(morgan('combined'));

    app.get('/health', (_req, res) => {
      res.send('ok');
    });

    app.listen(this.port, this.host, () => {
      console.log(`Listening on http://${this.host}:${this.port}`);
    });
  }
}

module.exports = ProxyServer;
// app.use('/api', proxy('http://dev.ghbeta.com:8950'));
// app.use('/', proxy('http://localhost:5101'));
