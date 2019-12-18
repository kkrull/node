const ApiServer = require('./api-server');
const ProxyServer = require('./proxy-server');
const WebServer = require('./web-server');

const host = '127.0.0.1';
const basePort = 3000;

const apiServer = new ApiServer(host, basePort + 1);
const webServer = new WebServer(host, basePort + 2, 'public');
const proxyServer = new ProxyServer(host, basePort + 3, apiServer.address, webServer.address);

apiServer.listen()
  .then(() => webServer.listen())
  .then(() => proxyServer.listen())
  .then(() => console.log('Shake and bake!'));
