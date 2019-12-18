const ApiServer = require('./api-server');
const ProxyServer = require('./proxy-server');

const host = '127.0.0.1';
const basePort = 3000;

const proxyServer = new ProxyServer(host, basePort + 3);
proxyServer.listen();
