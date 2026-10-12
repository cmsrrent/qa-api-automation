const BaseClient = require('./baseClient');
const config = require('../config/environment');

/**
 * Client for Restful Booker Authentication endpoints.
 */
class AuthClient extends BaseClient {
  /**
   * Generates a new auth token
   * @param {object} [credentials] - Username and password
   */
  createToken(credentials = config.credentials) {
    return this.post('/auth', credentials);
  }
}

module.exports = new AuthClient();
