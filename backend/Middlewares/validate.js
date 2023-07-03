const validateJoiSchema = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false }); // bydefault abortEarly = true

  module.exports = {validateJoiSchema};