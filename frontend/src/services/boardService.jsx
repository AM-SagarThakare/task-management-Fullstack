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

export {
  addNewBoard,
  getAllBoards,
  getBoardDetailsByID,
  updateBoardTitle,
  deleteBoardByID,
};
