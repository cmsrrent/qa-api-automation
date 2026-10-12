const bookingDatesSchema = {
  type: 'object',
  required: ['checkin', 'checkout'],
  properties: {
    checkin: { type: 'string' },
    checkout: { type: 'string' },
  },
  additionalProperties: true,
};

const bookingDetailsSchema = {
  type: 'object',
  required: ['firstname', 'lastname', 'totalprice', 'depositpaid', 'bookingdates'],
  properties: {
    firstname: { type: 'string' },
    lastname: { type: 'string' },
    totalprice: { type: 'number' },
    depositpaid: { type: 'boolean' },
    bookingdates: bookingDatesSchema,
    additionalneeds: { type: 'string' },
  },
  additionalProperties: true,
};

const createBookingResponseSchema = {
  type: 'object',
  required: ['bookingid', 'booking'],
  properties: {
    bookingid: { type: 'integer' },
    booking: bookingDetailsSchema,
  },
  additionalProperties: true,
};

const bookingIdsListSchema = {
  type: 'array',
  items: {
    type: 'object',
    required: ['bookingid'],
    properties: {
      bookingid: { type: 'integer' },
    },
    additionalProperties: true,
  },
};

module.exports = {
  bookingDatesSchema,
  bookingDetailsSchema,
  createBookingResponseSchema,
  bookingIdsListSchema,
};
