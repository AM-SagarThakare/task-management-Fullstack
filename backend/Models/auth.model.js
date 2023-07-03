const mongoose = require("mongoose");

// by using this schema data will stored in this format in mongodb
const userRegistrationSchema = mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  mobileNo: Number,
  date: String,
});

module.exports = mongoose.model("user", userRegistrationSchema);
