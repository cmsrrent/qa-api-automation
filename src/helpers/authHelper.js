const authClient = require('../clients/authClient');

let cachedToken = null;

/**
 * Retrieves an authentication token for administrative operations.
 * Caches the token in-memory to reduce redundant network round-trips across tests.
 * @param {boolean} [forceRefresh=false] - When true, bypasses cache and creates a fresh token
 * @returns {Promise<string>} Authentication token
 */
async function getAuthToken(forceRefresh = false) {
  if (cachedToken && !forceRefresh) {
    return cachedToken;
  }

  const response = await authClient.createToken();
  if (response.status !== 200 || !response.body.token) {
    throw new Error(
      `Failed to obtain auth token. Status: ${response.status}, Body: ${JSON.stringify(response.body)}`
    );
  }

  cachedToken = response.body.token;
  return cachedToken;
}

module.exports = {
  getAuthToken,
};
