const ApiServer = require('./api-server');
const ProxyServer = require('./proxy-server');

const host = '127.0.0.1';
const basePort = 3000;

const apiServer = new ApiServer(host, basePort + 1);
const proxyServer = new ProxyServer(host, basePort + 3, apiServer.address);

apiServer.listen()
  .then(() => proxyServer.listen())
  .then(() => console.log('Shake and bake!'));
