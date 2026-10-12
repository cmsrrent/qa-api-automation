const { validateSchema } = require('../../src/helpers/schemaValidator');

describe('Schema Validator Helper', () => {
  const sampleSchema = {
    type: 'object',
    required: ['id', 'name'],
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
    },
  };

  it('should return isValid true when data matches schema', () => {
    const validData = { id: 1, name: 'Sample' };
    const result = validateSchema(sampleSchema, validData);

    expect(result.isValid).toBe(true);
    expect(result.errors).toBeNull();
  });

  it('should return isValid false and provide errors when data fails schema', () => {
    const invalidData = { id: 'not-a-number' }; // Missing 'name', wrong type for 'id'
    const result = validateSchema(sampleSchema, invalidData);

    expect(result.isValid).toBe(false);
    expect(Array.isArray(result.errors)).toBe(true);
    expect(result.errors.length).toBeGreaterThan(0);
  });
});
