const bookingClient = require('../../src/clients/bookingClient');
const { generateBookingData } = require('../../src/data/bookingDataFactory');
const { validateSchema } = require('../../src/helpers/schemaValidator');
const {
  bookingDetailsSchema,
  bookingIdsListSchema,
} = require('../../src/schemas/bookingSchema');

describe('Booking API - GET /booking', () => {
  let createdBookingId;
  let createdPayload;

  beforeAll(async () => {
    createdPayload = generateBookingData();
    const createRes = await bookingClient.createBooking(createdPayload);
    createdBookingId = createRes.body.bookingid;
  });

  it('should retrieve booking details by ID with valid schema and matching data', async () => {
    const response = await bookingClient.getBooking(createdBookingId);

    expect(response.status).toBe(200);

    // Validate JSON Schema
    const validation = validateSchema(bookingDetailsSchema, response.body);
    expect(validation.isValid).toBe(true);
    expect(validation.errors).toBeNull();

    // Verify fields match created data
    expect(response.body.firstname).toBe(createdPayload.firstname);
    expect(response.body.lastname).toBe(createdPayload.lastname);
    expect(response.body.totalprice).toBe(createdPayload.totalprice);
    expect(response.body.depositpaid).toBe(createdPayload.depositpaid);
    expect(response.body.bookingdates.checkin).toBe(createdPayload.bookingdates.checkin);
    expect(response.body.bookingdates.checkout).toBe(createdPayload.bookingdates.checkout);
  });

  it('should return a list of all booking IDs', async () => {
    const response = await bookingClient.getBookingIds();

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);

    const validation = validateSchema(bookingIdsListSchema, response.body);
    expect(validation.isValid).toBe(true);
  });

  it('should filter booking IDs by firstname and lastname', async () => {
    const uniqueFirstName = `QAFirst${Date.now()}`;
    const uniqueLastName = `QALast${Date.now()}`;

    const specificBooking = generateBookingData({
      firstname: uniqueFirstName,
      lastname: uniqueLastName,
    });

    const createRes = await bookingClient.createBooking(specificBooking);
    const targetId = createRes.body.bookingid;

    const response = await bookingClient.getBookingIds({
      firstname: uniqueFirstName,
      lastname: uniqueLastName,
    });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    const match = response.body.find((item) => item.bookingid === targetId);
    expect(match).toBeDefined();
    expect(match.bookingid).toBe(targetId);
  });

  it('should return 404 Not Found when requesting a non-existent booking ID', async () => {
    const nonExistentId = 999999999;
    const response = await bookingClient.getBooking(nonExistentId);

    expect(response.status).toBe(404);
  });
});
