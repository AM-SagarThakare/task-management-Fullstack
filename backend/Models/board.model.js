const mongoose = require("mongoose");

const addNewBoardSchema = mongoose.Schema(
  {
    boardOwnerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    boardTitle: String,
    list: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "list",
      },
    ],
  },
  { timestamp: true }
);

module.exports = mongoose.model("board", addNewBoardSchema);
