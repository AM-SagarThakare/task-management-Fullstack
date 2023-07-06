import service from "../middlewares/interceptor";

const registerUser = async (payload) => {
  service.post("/auth/registration", payload);
};

const loginUser = (payload) => {
  return service.post("/auth/login", payload);
};

export { loginUser, registerUser };
