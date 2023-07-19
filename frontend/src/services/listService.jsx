import service from "../middlewares/interceptor";

const addNewList = (payload) => {
  return service.post("/user/board/list/add-list", payload);
};
export { addNewList };
