const bookingClient = require('../../src/clients/bookingClient');
const { generateBookingData } = require('../../src/data/bookingDataFactory');
const { validateSchema } = require('../../src/helpers/schemaValidator');
const { createBookingResponseSchema } = require('../../src/schemas/bookingSchema');

describe('Booking API - POST /booking', () => {
  it('should successfully create a new booking with dynamic test data', async () => {
    const payload = generateBookingData();

    const response = await bookingClient.createBooking(payload);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('bookingid');
    expect(typeof response.body.bookingid).toBe('number');

    // Validate JSON Schema
    const validation = validateSchema(createBookingResponseSchema, response.body);
    expect(validation.isValid).toBe(true);
    expect(validation.errors).toBeNull();

    // Verify response payload fidelity
    const created = response.body.booking;
    expect(created.firstname).toBe(payload.firstname);
    expect(created.lastname).toBe(payload.lastname);
    expect(created.totalprice).toBe(payload.totalprice);
    expect(created.depositpaid).toBe(payload.depositpaid);
    expect(created.bookingdates.checkin).toBe(payload.bookingdates.checkin);
    expect(created.bookingdates.checkout).toBe(payload.bookingdates.checkout);
    expect(created.additionalneeds).toBe(payload.additionalneeds);
  });

  it('should successfully create a booking with customized additional needs', async () => {
    const customNeeds = 'Vegetarian meal, late checkout at 2pm';
    const payload = generateBookingData({ additionalneeds: customNeeds });

    const response = await bookingClient.createBooking(payload);

    expect(response.status).toBe(200);
    expect(response.body.booking.additionalneeds).toBe(customNeeds);
  });

  it('should successfully create a booking with deposit unpaid and price 0', async () => {
    const payload = generateBookingData({ totalprice: 0, depositpaid: false });

    const response = await bookingClient.createBooking(payload);

    expect(response.status).toBe(200);
    expect(response.body.booking.totalprice).toBe(0);
    expect(response.body.booking.depositpaid).toBe(false);
  });
});
