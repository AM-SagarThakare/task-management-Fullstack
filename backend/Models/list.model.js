const mongoose = require("mongoose");

const listSchema = mongoose.Schema({
  boardID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "board",
  },
  listTitle: String,
  card: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "card",
    },
  ],
});
module.exports = mongoose.model("list", listSchema);
