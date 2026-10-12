const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

/**
 * Validates a JavaScript object against a JSON schema
 * @param {object} schema - JSON Schema definition
 * @param {any} data - Data to validate
 * @returns {{ isValid: boolean, errors: string[] | null }}
 */
function validateSchema(schema, data) {
  const validate = ajv.compile(schema);
  const isValid = validate(data);

  if (!isValid) {
    const errors = validate.errors.map(
      (err) => `${err.instancePath || 'root'} ${err.message}`
    );
    return { isValid: false, errors };
  }

  return { isValid: true, errors: null };
}

module.exports = {
  validateSchema,
};
