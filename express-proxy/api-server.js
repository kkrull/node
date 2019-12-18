const express = require('express');
const morgan = require('morgan');

class ApiServer {
  constructor(host, port) {
    this.host = host;
    this.port = port;
  }

  get address() {
    return `http://${this.host}:${this.port}`;
  }

  listen() {
    const app = express();
    app.use(morgan('[API]   :method :url :status :response-time ms - :res[content-length]'));

    app.get('/health', (_req, res) => {
      res.send("api ok\n");
    });

    return new Promise((resolve, reject) => {
      app.listen(this.port, this.host, () => {
        console.log(`API server listening on ${this.address}`);
        resolve();
      });
    });
  }
}

module.exports = ApiServer;
