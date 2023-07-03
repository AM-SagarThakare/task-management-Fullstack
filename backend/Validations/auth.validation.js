const joi = require("joi");

const login = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const register = joi.object({
  userName: joi.string().trim().required(),
  email: joi.string().email().trim().required(),
  password: joi.string().min(4).required(),
  confirmPassword: joi
    .equal(joi.ref("password"))
    .messages({
      "any.only": "password and confirm password do not match.",
    })
    .required(),
});

module.exports = {
  login,
  register,
};
