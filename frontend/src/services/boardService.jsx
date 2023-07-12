import service from "../middlewares/interceptor";

const addNewBoard = async (payload) => {
  return service.post('/user/board/add-board', payload);
};

export { addNewBoard };
