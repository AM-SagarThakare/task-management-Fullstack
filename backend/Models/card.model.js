const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({
  listID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "list",
  },
  cardTitle: String,
  cardDescription: String,
});

module.exports = mongoose.model("card", cardSchema);
