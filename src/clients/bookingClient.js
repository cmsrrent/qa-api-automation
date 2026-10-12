const BaseClient = require('./baseClient');

/**
 * Client for Restful Booker Booking and Ping endpoints.
 */
class BookingClient extends BaseClient {
  /**
   * Health check endpoint
   */
  ping() {
    return this.get('/ping');
  }

  /**
   * Retrieves all booking IDs, optionally filtered
   * @param {object} [params={}] - Query parameters (firstname, lastname, checkin, checkout)
   */
  getBookingIds(params = {}) {
    return this.get('/booking', params);
  }

  /**
   * Retrieves a single booking by ID
   * @param {number|string} id - Booking ID
   * @param {object} [headers={}] - Custom headers
   */
  getBooking(id, headers = {}) {
    return this.get(`/booking/${id}`, {}, headers);
  }

  /**
   * Creates a new booking
   * @param {object} payload - Booking details
   * @param {object} [headers={}] - Custom headers
   */
  createBooking(payload, headers = {}) {
    return this.post('/booking', payload, headers);
  }

  /**
   * Fully updates an existing booking (PUT)
   * @param {number|string} id - Booking ID
   * @param {object} payload - Complete updated booking details
   * @param {string} [token] - Auth token
   * @param {object} [headers={}] - Additional headers
   */
  updateBooking(id, payload, token, headers = {}) {
    const requestHeaders = { ...headers };
    if (token) {
      requestHeaders['Cookie'] = `token=${token}`;
    }
    return this.put(`/booking/${id}`, payload, requestHeaders);
  }

  /**
   * Partially updates an existing booking (PATCH)
   * @param {number|string} id - Booking ID
   * @param {object} partialPayload - Partial fields to update
   * @param {string} [token] - Auth token
   * @param {object} [headers={}] - Additional headers
   */
  partialUpdateBooking(id, partialPayload, token, headers = {}) {
    const requestHeaders = { ...headers };
    if (token) {
      requestHeaders['Cookie'] = `token=${token}`;
    }
    return this.patch(`/booking/${id}`, partialPayload, requestHeaders);
  }

  /**
   * Deletes an existing booking
   * @param {number|string} id - Booking ID
   * @param {string} [token] - Auth token
   * @param {object} [headers={}] - Additional headers
   */
  deleteBooking(id, token, headers = {}) {
    const requestHeaders = { ...headers };
    if (token) {
      requestHeaders['Cookie'] = `token=${token}`;
    }
    return this.delete(`/booking/${id}`, requestHeaders);
  }
}

module.exports = new BookingClient();
