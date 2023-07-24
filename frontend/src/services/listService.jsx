import service from "../middlewares/interceptor";

const addNewList = (payload) => {
  return service.post("/user/board/list/add-list", payload);
};

const deleteListByID = (listID) => {
  return service.delete(`/user/board/list/${listID}`);
};

const updateList = (payload, listID) => {
  return service.patch(`/user/board/list/${listID}`, payload);
};
export { addNewList, deleteListByID, updateList };
