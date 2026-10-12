require('dotenv').config({ quiet: true });

const config = {
  baseUrl: process.env.BASE_URL || 'https://restful-booker.herokuapp.com',
  timeout: parseInt(process.env.REQUEST_TIMEOUT, 10) || 15000,
  credentials: {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'password123',
  },
};

module.exports = config;
