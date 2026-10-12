const bookingClient = require('../../src/clients/bookingClient');
const { getAuthToken } = require('../../src/helpers/authHelper');
const {
  generateBookingData,
  generatePartialBookingData,
} = require('../../src/data/bookingDataFactory');
const { validateSchema } = require('../../src/helpers/schemaValidator');
const { bookingDetailsSchema } = require('../../src/schemas/bookingSchema');

describe('Booking API - PUT & PATCH /booking/:id', () => {
  let authToken;
  let bookingId;
  let initialPayload;

  beforeAll(async () => {
    authToken = await getAuthToken();
  });

  beforeEach(async () => {
    initialPayload = generateBookingData();
    const createRes = await bookingClient.createBooking(initialPayload);
    bookingId = createRes.body.bookingid;
  });

  describe('PUT /booking/:id - Full Update', () => {
    it('should fully update an existing booking when authenticated with a valid token', async () => {
      const updatePayload = generateBookingData({
        additionalneeds: 'Champagne on arrival',
      });

      const response = await bookingClient.updateBooking(
        bookingId,
        updatePayload,
        authToken
      );

      expect(response.status).toBe(200);

      const validation = validateSchema(bookingDetailsSchema, response.body);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toBeNull();

      expect(response.body.firstname).toBe(updatePayload.firstname);
      expect(response.body.lastname).toBe(updatePayload.lastname);
      expect(response.body.totalprice).toBe(updatePayload.totalprice);
      expect(response.body.depositpaid).toBe(updatePayload.depositpaid);
      expect(response.body.additionalneeds).toBe(updatePayload.additionalneeds);
    });

    it('should return 403 Forbidden when attempting full update without an auth token', async () => {
      const updatePayload = generateBookingData();

      const response = await bookingClient.updateBooking(
        bookingId,
        updatePayload,
        null // No token provided
      );

      expect(response.status).toBe(403);
    });

    it('should return 403 Forbidden when attempting full update with an invalid token', async () => {
      const updatePayload = generateBookingData();

      const response = await bookingClient.updateBooking(
        bookingId,
        updatePayload,
        'invalid_token_xyz_123'
      );

      expect(response.status).toBe(403);
    });
  });

  describe('PATCH /booking/:id - Partial Update', () => {
    it('should partially update specified fields of an existing booking', async () => {
      const partialPayload = generatePartialBookingData({
        firstname: 'UpdatedFirstName',
        totalprice: 1250,
      });

      const response = await bookingClient.partialUpdateBooking(
        bookingId,
        partialPayload,
        authToken
      );

      expect(response.status).toBe(200);
      expect(response.body.firstname).toBe('UpdatedFirstName');
      expect(response.body.totalprice).toBe(1250);

      // Verify un-updated fields remained unchanged
      expect(response.body.lastname).toBe(initialPayload.lastname);
      expect(response.body.depositpaid).toBe(initialPayload.depositpaid);
    });

    it('should return 403 Forbidden when attempting partial update without an auth token', async () => {
      const partialPayload = generatePartialBookingData();

      const response = await bookingClient.partialUpdateBooking(
        bookingId,
        partialPayload,
        null
      );

      expect(response.status).toBe(403);
    });
  });
});
