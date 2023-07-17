const { boardCollection } = require("../Models");

const getAllBoards = async (user_id) => {
  return await boardCollection.find({ boardOwnerID: user_id });
};
const getBoardDetailsByID = async (boardID) => {
  return await boardCollection.find({ _id: boardID });
};

const updateBoard = async (payload) => {
  console.log("in board service");
  return await boardCollection.updateOne(
    { _id: payload.boardID },
    { $set: payload }
  );
};
const deleteBoard = async (boardID) => {
  return await boardCollection.deleteOne({ _id: boardID });
};
module.exports = {
  getAllBoards,
  getBoardDetailsByID,
  updateBoard,
  deleteBoard,
};
