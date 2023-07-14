const { boardCollection } = require("../Models");

const getAllBoards = async (user_id) => {
  return await boardCollection.find({ boardOwnerID: user_id });
};
const getBoardDetailsByID = async (boardID) => {
  return await boardCollection.find({ _id: boardID });
};

module.exports = {
  getAllBoards,
  getBoardDetailsByID,
};
