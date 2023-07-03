const express = require("express");
const app = express();
const router = express.Router();
const bcrypt = require("bcrypt");
const { validate } = require("../Middlewares");
const { authValidation } = require("../Validations");
const { userService } = require("../Services");
const { userCollection } = require("../Models");

const registerUser = async (req, res) => {
  const { error, value } = validate.validateJoiSchema(authValidation.register)(
    req.body
  );

  if (error) {
    return res.status(400).send(error.details[0]);
  }

  if (await userService.isEmailPresent(req))
    return res
      .status(409)
      .send({ message: "user registered already with this email-id" });

  async function getHashedPassword(password) {
    // const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, 10);
  }

  const payload = { ...req.body, ...value, date: new Date() };
  payload.password = await getHashedPassword(req.body.password);

  const newUser = new userCollection(payload);

  try {
    await newUser.save();

    res.send({
      message: "user Registered successfully",
      success: true,
    });
  } catch (err) {
    res.send({ message: err.message });
  }
};

module.exports = {
  registerUser,
};
