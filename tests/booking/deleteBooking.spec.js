const bookingClient = require('../../src/clients/bookingClient');
const { getAuthToken } = require('../../src/helpers/authHelper');
const { generateBookingData } = require('../../src/data/bookingDataFactory');

describe('Booking API - DELETE /booking/:id', () => {
  let authToken;
  let bookingId;

  beforeAll(async () => {
    authToken = await getAuthToken();
  });

  beforeEach(async () => {
    const payload = generateBookingData();
    const createRes = await bookingClient.createBooking(payload);
    bookingId = createRes.body.bookingid;
  });

  it('should delete an existing booking when authenticated with a valid token', async () => {
    const deleteResponse = await bookingClient.deleteBooking(bookingId, authToken);

    expect(deleteResponse.status).toBe(201);
    expect(deleteResponse.text).toBe('Created');

    // Confirm that the booking is no longer retrievable
    const getResponse = await bookingClient.getBooking(bookingId);
    expect(getResponse.status).toBe(404);
  });

  it('should return 403 Forbidden when attempting delete without an auth token', async () => {
    const deleteResponse = await bookingClient.deleteBooking(bookingId, null);

    expect(deleteResponse.status).toBe(403);

    // Verify booking was not deleted
    const getResponse = await bookingClient.getBooking(bookingId);
    expect(getResponse.status).toBe(200);
  });

  it('should return 403 Forbidden when attempting delete with an invalid token', async () => {
    const deleteResponse = await bookingClient.deleteBooking(
      bookingId,
      'invalid_bad_token_456'
    );

    expect(deleteResponse.status).toBe(403);
  });
});
