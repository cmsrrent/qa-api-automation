const authClient = require('../../src/clients/authClient');
const config = require('../../src/config/environment');
const { validateSchema } = require('../../src/helpers/schemaValidator');
const {
  createTokenSuccessSchema,
  badCredentialsSchema,
} = require('../../src/schemas/authSchema');

describe('Auth API - POST /auth', () => {
  it('should successfully create an auth token with valid credentials', async () => {
    const response = await authClient.createToken({
      username: config.credentials.username,
      password: config.credentials.password,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(typeof response.body.token).toBe('string');
    expect(response.body.token.length).toBeGreaterThan(0);

    const validation = validateSchema(createTokenSuccessSchema, response.body);
    expect(validation.isValid).toBe(true);
    expect(validation.errors).toBeNull();
  });

  it('should return bad credentials reason when password is incorrect', async () => {
    const response = await authClient.createToken({
      username: config.credentials.username,
      password: 'wrong_password_999',
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ reason: 'Bad credentials' });

    const validation = validateSchema(badCredentialsSchema, response.body);
    expect(validation.isValid).toBe(true);
  });

  it('should return bad credentials reason when username is unknown', async () => {
    const response = await authClient.createToken({
      username: 'non_existent_admin_user',
      password: config.credentials.password,
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ reason: 'Bad credentials' });

    const validation = validateSchema(badCredentialsSchema, response.body);
    expect(validation.isValid).toBe(true);
  });

  it('should return bad credentials reason when empty payload is sent', async () => {
    const response = await authClient.createToken({});

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ reason: 'Bad credentials' });
  });
});
