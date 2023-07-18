const { boardCollection } = require("../Models");

const getAllBoards = async (user_id) => {
  return await boardCollection.find({ boardOwnerID: user_id });
};
const getBoardDetailsByID = async (boardID) => {
  console.log(" board service");
  console.log("boardID", boardID);
  try {
    return await boardCollection.find({ _id: boardID }).populate("list");
  } catch (err) {
    console.log(err.message);
  }
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
const addListID = async (payload) => {
  return await boardCollection.updateOne(
    { _id: payload.boardID },
    { $push: { list: payload.listID } }
  );
};

module.exports = {
  getAllBoards,
  getBoardDetailsByID,
  updateBoard,
  deleteBoard,
  addListID,
};
