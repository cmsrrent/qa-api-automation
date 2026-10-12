const { faker } = require('@faker-js/faker');

/**
 * Format a Date object as YYYY-MM-DD for Restful Booker API
 * @param {Date} date
 * @returns {string}
 */
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

/**
 * Generates a valid booking payload with dynamic test data
 * @param {object} [overrides={}] - Properties to override
 * @returns {object} Booking payload
 */
function generateBookingData(overrides = {}) {
  const checkinDate = faker.date.soon({ days: 30 });
  const checkoutDate = faker.date.soon({ days: 10, refDate: checkinDate });

  const defaultBooking = {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    totalprice: faker.number.int({ min: 75, max: 800 }),
    depositpaid: faker.datatype.boolean(),
    bookingdates: {
      checkin: formatDate(checkinDate),
      checkout: formatDate(checkoutDate),
    },
    additionalneeds: faker.helpers.arrayElement([
      'Breakfast',
      'Late Checkout',
      'Airport Shuttle',
      'Sea View',
      'Extra Bed',
    ]),
  };

  return {
    ...defaultBooking,
    ...overrides,
    bookingdates: {
      ...defaultBooking.bookingdates,
      ...(overrides.bookingdates || {}),
    },
  };
}

/**
 * Generates partial booking data suitable for PATCH requests
 * @param {object} [overrides={}]
 * @returns {object}
 */
function generatePartialBookingData(overrides = {}) {
  const defaultPartial = {
    firstname: faker.person.firstName(),
    totalprice: faker.number.int({ min: 900, max: 1500 }),
  };

  return {
    ...defaultPartial,
    ...overrides,
  };
}

module.exports = {
  generateBookingData,
  generatePartialBookingData,
  formatDate,
};
