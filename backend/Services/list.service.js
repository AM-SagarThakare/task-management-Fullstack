const { listCollection } = require("../Models");

// const addNewList = async (boardID) => {
//   return await
// };

const addCardID = async (payload) => {
  return await listCollection.updateOne(
    { _id: payload.listID },
    { $push: { card: payload._id } }
  );
};

const deleteListByID = async (listID) => {
  return await listCollection.deleteOne({ _id: listID });
};

const updateListByID = async (listID, payload) => {
  return await listCollection.updateOne({ _id: listID }, { $set: payload });
};

module.exports = {
  // addNewList
  addCardID,
  deleteListByID,
  updateListByID,
};
