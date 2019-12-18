const express = require('express');
const morgan = require('morgan');

class WebServer {
  constructor(host, port, staticDirectory) {
    this.host = host;
    this.port = port;
    this.staticDirectory = staticDirectory;
  }

  get address() {
    return `http://${this.host}:${this.port}`;
  }

  listen() {
    const app = express();
    app.use(morgan('[Web]   :method :url :status :response-time ms - :res[content-length]'));
    app.use(express.static(this.staticDirectory));

    app.get('/health', (_req, res) => {
      res.send("web ok\n");
    });

    return new Promise((resolve, reject) => {
      app.listen(this.port, this.host, () => {
        console.log(`Web server listening on ${this.address}`);
        resolve();
      });
    });
  }
}

module.exports = WebServer;
