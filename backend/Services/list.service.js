// const addNewList = async (boardID) => {
//   return await 
// };

const addCardID = async (payload) => {
    return await boardCollection.update(
      { _id: payload.boardID },
      { $push: { card: _id } }
    );
  };

module.exports = {
    // addNewList
}
