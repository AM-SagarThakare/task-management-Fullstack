const { boardCollection } = require("../Models");

const getAllBoards = async (user_id) => {
  return await boardCollection.find({ boardOwnerID: user_id });
};
const getBoardDetailsByID = async (boardID) => {
  try {
    return await boardCollection
      .find({ _id: boardID })
      .populate({ path: "list", populate: { path: "card" } });
  } catch (err) {
    console.log(err.message);
  }
};
const updateBoard = async (boardID, payload) => {
  return await boardCollection.updateOne({ _id: boardID }, { $set: payload });
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
