import service from "../middlewares/interceptor";

const addNewBoard = (payload) => {
  return service.post("/user/board/add-board", payload);
};

const getAllBoards = () => {
  return service.get("/user/board/all-boards");
};

export { addNewBoard, getAllBoards };
