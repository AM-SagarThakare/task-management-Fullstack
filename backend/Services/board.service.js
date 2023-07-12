const { boardCollection } = require("../Models");

const getAllBoards = async (user_id) => {
  return await boardCollection.find({ boardOwnerID: user_id });
};

module.exports = {
  getAllBoards,
};
