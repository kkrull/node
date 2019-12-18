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
    app.use(morgan('[Proxy] :method :url :status :response-time ms - :res[content-length]'));

    app.get('/health', (_req, res) => {
      res.send("proxy ok\n");
    });

    return new Promise((resolve, reject) => {
      app.listen(this.port, this.host, () => {
        console.log(`Proxy sever listening on http://${this.host}:${this.port}`);
        resolve();
      });
    });
  }
}

module.exports = ProxyServer;
// app.use('/api', proxy('http://dev.ghbeta.com:8950'));
// app.use('/', proxy('http://localhost:5101'));
