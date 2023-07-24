import service from "../middlewares/interceptor";

const addNewCard = (payload) => {
  return service.post("/user/board/list/card/add-card", payload);
};

export { addNewCard };
