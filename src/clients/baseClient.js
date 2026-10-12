const request = require('supertest');
const config = require('../config/environment');

/**
 * Base API Client wrapping SuperTest.
 * Provides uniform HTTP verbs, default headers, and centralized base URL resolution.
 */
class BaseClient {
  constructor(baseUrl = config.baseUrl) {
    this.baseUrl = baseUrl;
    this.http = request(this.baseUrl);
    this.timeout = config.timeout;
  }

  /**
   * Executes a GET request
   * @param {string} endpoint - API path
   * @param {object} [query={}] - Query parameters
   * @param {object} [headers={}] - Custom headers
   */
  get(endpoint, query = {}, headers = {}) {
    const req = this.http
      .get(endpoint)
      .set('Accept', 'application/json')
      .set(headers)
      .query(query)
      .timeout(this.timeout);

    return req;
  }

  /**
   * Executes a POST request
   * @param {string} endpoint - API path
   * @param {object} [body={}] - JSON payload
   * @param {object} [headers={}] - Custom headers
   */
  post(endpoint, body = {}, headers = {}) {
    const req = this.http
      .post(endpoint)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set(headers)
      .send(body)
      .timeout(this.timeout);

    return req;
  }

  /**
   * Executes a PUT request
   * @param {string} endpoint - API path
   * @param {object} [body={}] - JSON payload
   * @param {object} [headers={}] - Custom headers
   */
  put(endpoint, body = {}, headers = {}) {
    const req = this.http
      .put(endpoint)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set(headers)
      .send(body)
      .timeout(this.timeout);

    return req;
  }

  /**
   * Executes a PATCH request
   * @param {string} endpoint - API path
   * @param {object} [body={}] - JSON payload
   * @param {object} [headers={}] - Custom headers
   */
  patch(endpoint, body = {}, headers = {}) {
    const req = this.http
      .patch(endpoint)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set(headers)
      .send(body)
      .timeout(this.timeout);

    return req;
  }

  /**
   * Executes a DELETE request
   * @param {string} endpoint - API path
   * @param {object} [headers={}] - Custom headers
   */
  delete(endpoint, headers = {}) {
    const req = this.http
      .delete(endpoint)
      .set(headers)
      .timeout(this.timeout);

    return req;
  }
}

module.exports = BaseClient;
