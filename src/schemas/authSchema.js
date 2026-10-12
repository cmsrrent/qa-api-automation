const createTokenSuccessSchema = {
  type: 'object',
  required: ['token'],
  properties: {
    token: {
      type: 'string',
      minLength: 1,
    },
  },
  additionalProperties: false,
};

const badCredentialsSchema = {
  type: 'object',
  required: ['reason'],
  properties: {
    reason: {
      type: 'string',
    },
  },
  additionalProperties: false,
};

module.exports = {
  createTokenSuccessSchema,
  badCredentialsSchema,
};
