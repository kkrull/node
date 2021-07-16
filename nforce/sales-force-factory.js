const nforce = require('nforce');
const path = require('path');
const process = require('process');

class SalesForceFactory {
  static forEnvironment(environment) {
    const dotenvPath = path.join(__dirname, `.env.${environment}`);
    console.log(`Loading environment settings: ${dotenvPath}`);
    require('dotenv').config({ path: dotenvPath });

    return new SalesForceFactory(process.env);
  }

  constructor(env) {
    this._env = env;
  }

  authenticationOptions() {
    return {
      username: this._env['USERNAME'],
      password: this._env['PASSWORD'],
      securityToken: this._env['SECURITY_TOKEN'],
    };
  }

  createConnection(redirectUri) {
    console.log(`Creating connection for client: ${this._env['CLIENT_ID']}`);
    return nforce.createConnection({
      authEndpoint:
        'https://8thlight-dev-ed.my.salesforce.com/services/oauth2/authorize',
      clientId: this._env['CLIENT_ID'],
      clientSecret: this._env['CLIENT_SECRET'],
      redirectUri,
    });
  }
}

module.exports = SalesForceFactory;
