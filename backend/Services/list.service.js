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

// const addCardID = async()=>{

// }

module.exports = {
  // addNewList
  addCardID
};
