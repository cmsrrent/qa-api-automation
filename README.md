# QA API Automation Framework

[![API Test Automation](https://github.com/cmsrrent/qa-api-automation/actions/workflows/api-tests.yml/badge.svg?branch=master)](https://github.com/cmsrrent/qa-api-automation/actions/workflows/api-tests.yml)

A modular API test automation showcase project built with **Node.js**, **SuperTest**, and **Jest**, using the public [Restful Booker API](https://restful-booker.herokuapp.com).

This project is architected using the **Service Object Pattern (API Clients)**, **Data Builders / Factories**, **JSON Schema Contract Validation**, and **Automated HTML Reporting**.

---

## 🚀 Key Highlights & Architecture Patterns

1. **Service Object / API Client Pattern (`src/clients/`)**
   - Encapsulates SuperTest requests, HTTP verbs, paths, default headers, and timeouts inside client classes (`baseClient`, `authClient`, `bookingClient`).
   - Tests focus purely on business logic, status codes, and assertions rather than raw HTTP boilerplate.

2. **Dynamic Test Data Generation (`src/data/bookingDataFactory.js`)**
   - Powered by `@faker-js/faker` to generate randomized, realistic payloads for each test run.
   - Eliminates hardcoded test data collisions and supports effortless property overriding.

3. **JSON Schema / Contract Validation (`src/schemas/`, `src/helpers/schemaValidator.js`)**
   - Employs **Ajv** (Another JSON Schema Validator) and `ajv-formats` against standard JSON Schema definitions.
   - Verifies API contract integrity (required fields, types, formats) alongside functional status assertions.

4. **Authentication & Session Management (`src/helpers/authHelper.js`)**
   - Automatically handles auth token generation and in-memory caching to optimize execution times against secured endpoints (`PUT`, `PATCH`, `DELETE`).

5. **Centralized Configuration (`src/config/environment.js`)**
   - Environment-driven configuration via `dotenv` with fallback defaults. Easily switch between local, staging, and remote instances.

6. **Rich HTML Reporting (`reports/test-report.html`)**
   - Automatically generates a themed HTML report on test completion via `jest-html-reporter`.

---

## 📁 Project Structure

```text
qa-api-automation/
├── .github/
│   └── workflows/
│       └── api-tests.yml        # CI/CD GitHub Actions workflow
├── reports/
│   └── test-report.html         # Generated HTML test execution report
├── src/
│   ├── clients/                 # Service Object pattern API clients
│   │   ├── baseClient.js        # Core SuperTest wrapper
│   │   ├── authClient.js        # /auth endpoints
│   │   └── bookingClient.js     # /booking & /ping endpoints
│   ├── config/
│   │   └── environment.js       # Environment configuration & defaults
│   ├── data/
│   │   └── bookingDataFactory.js# Dynamic payload generators (@faker-js/faker)
│   ├── helpers/
│   │   ├── authHelper.js        # Auth token retrieval & caching
│   │   └── schemaValidator.js   # Ajv JSON schema validation wrapper
│   └── schemas/                 # JSON Schema definitions (Draft-07)
│       ├── authSchema.js        # Auth response schemas
│       └── bookingSchema.js     # Booking response & entity schemas
├── tests/
│   ├── auth/
│   │   └── auth.spec.js         # Token creation & negative auth scenarios
│   ├── booking/
│   │   ├── createBooking.spec.js# Creation, customization, schema checks
│   │   ├── getBooking.spec.js   # Single get, list, query filtering, 404
│   │   ├── updateBooking.spec.js# Full (PUT) & Partial (PATCH), 403 checks
│   │   └── deleteBooking.spec.js# DELETE & 404 verification, 403 checks
│   ├── health/
│   │   └── ping.spec.js         # Healthcheck /ping endpoint
│   └── helpers/
│       └── schemaValidator.spec.js # Unit test for schema validator
├── .env.example                 # Example environment variables
├── jest.config.js               # Jest configuration & reporting settings
├── package.json                 # Project dependencies & scripts
└── README.md                    # Project documentation
```

---

## 🛠️ Prerequisites

- **Node.js**: `v18.x`, `v20.x`, or `v22.x` (tested on Node 22)
- **npm**: `v9.x` or higher

---

## ⚡ Quick Start

### 1. Clone & Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` (already pre-configured with Restful Booker defaults):

```bash
cp .env.example .env
```

Environment variables:

| Variable | Description | Default |
| :--- | :--- | :--- |
| `BASE_URL` | Base URL of the target API | `https://restful-booker.herokuapp.com` |
| `ADMIN_USERNAME` | Admin username for authentication | `admin` |
| `ADMIN_PASSWORD` | Admin password for authentication | `password123` |
| `REQUEST_TIMEOUT`| Request timeout in milliseconds | `15000` |

---

## 🧪 Running Tests

| Command | Description |
| :--- | :--- |
| `npm test` | Runs the entire test suite sequentially |
| `npm run test:health` | Runs health check tests (`/ping`) |
| `npm run test:auth` | Runs authentication tests (`/auth`) |
| `npm run test:booking`| Runs booking CRUD tests (`/booking`) |
| `npm run test:coverage`| Runs test suite with code coverage analysis |
| `npm run test:watch` | Runs Jest in interactive watch mode |

---

## 📊 Test Reports & Coverage

### HTML Test Report
After running tests, open the generated HTML report in your browser:

```bash
open reports/test-report.html
```

### Coverage Report
Running `npm run test:coverage` generates both terminal tables and full HTML coverage reports in `coverage/lcov-report/index.html`.

---

## 🧩 How to Extend This Project

### 1. Adding a New API Endpoint
Add a method to the relevant client in `src/clients/` (or create a new client extending `BaseClient`):

```javascript
// src/clients/bookingClient.js
getBookingSummary(id) {
  return this.get(`/booking/${id}/summary`);
}
```

### 2. Adding a New Schema
Define the contract in `src/schemas/`:

```javascript
// src/schemas/customSchema.js
const customResponseSchema = {
  type: 'object',
  required: ['id', 'status'],
  properties: {
    id: { type: 'number' },
    status: { type: 'string' },
  },
};

module.exports = { customResponseSchema };
```

### 3. Adding Dynamic Test Data
Expand `src/data/bookingDataFactory.js`:

```javascript
function generateCustomBooking() {
  return generateBookingData({
    additionalneeds: 'Late checkout',
  });
}
```

### 4. Writing a New Test Spec
Create a `.spec.js` file under `tests/`:

```javascript
const bookingClient = require('../../src/clients/bookingClient');
const { validateSchema } = require('../../src/helpers/schemaValidator');
const { customResponseSchema } = require('../../src/schemas/customSchema');

describe('Custom Endpoint Test', () => {
  it('should validate status and schema', async () => {
    const response = await bookingClient.getBooking(1);

    expect(response.status).toBe(200);

    const validation = validateSchema(customResponseSchema, response.body);
    expect(validation.isValid).toBe(true);
  });
});
```

---

## 🤖 CI / CD Integration

A GitHub Actions workflow is provided in `.github/workflows/api-tests.yml`. It:
- Executes on push and pull requests against `main`/`master`
- Matrix tests across Node.js `18.x`, `20.x`, and `22.x`
- Generates test coverage
- Uploads the HTML test report artifact for every build
