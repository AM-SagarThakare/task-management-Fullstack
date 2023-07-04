import service from "../middlewares/interceptor";

const registerUser = async (payload) => {
  service.post("/auth/registration", payload);
};


const loginUser = async(payload) => {
    service.get('/auth/login',payload)
};

export {
    loginUser,registerUser
}