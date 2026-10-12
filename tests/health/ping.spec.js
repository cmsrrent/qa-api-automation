const bookingClient = require('../../src/clients/bookingClient');

describe('Health Check API - GET /ping', () => {
  it('should return 201 Created when API is up and running', async () => {
    const response = await bookingClient.ping();

    expect(response.status).toBe(201);
    expect(response.text).toBe('Created');
  });
});
