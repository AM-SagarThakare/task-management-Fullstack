import service from "../middlewares/interceptor";

const addNewBoard = (payload) => {
  return service.post("/user/board/add-board", payload);
};

const getAllBoards = () => {
  return service.get("/user/board/all-boards");
};
const getBoardDetailsByID = (boardID) => {
  return service.get(`/user/board/${boardID}`);
};
const updateBoardTitle = (payload) => {
  return service.patch("/user/board", payload);
};

const deleteBoardByID = (boardID) => {
  return service.delete(`/user/board/${boardID}`);
};

// after drag and drop we have to update list nd card array of boardCollection
const updateBoard = (boardID, payload) => {
  console.log( payload);
  return service.patch(`/user/board/${boardID}`, payload);
};

export {
  addNewBoard,
  getAllBoards,
  updateBoard,
  getBoardDetailsByID,
  updateBoardTitle,
  deleteBoardByID,
};
