const mongoose = require("mongoose");

const listSchema = mongoose.Schema({
  boardOwnerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "board",
  },
  listTitle: String,
  card: [
    {
      type: String,
    },
  ],
});
