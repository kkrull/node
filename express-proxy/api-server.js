class ApiServer {
  constructor(host, port) {
    this.host = host;
    this.port = port;
  }

  listen() {
    console.log('listening...');
  }
}

module.exports = ApiServer;
