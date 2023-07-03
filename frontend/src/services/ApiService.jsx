import axios from "axios";
import service from "../middlewares/interceptor";
const baseURL = "http://localhost:5000";

// const api = axios.create({
//   baseURL,
// });

// axios
//   .get(baseURL)
//   .then((res) => console.log(res))
//   .catch((error) => console.log(error));

const registerUser = async (user) => {
  console.log(user);
  //   await axios
  //     // .post(baseURL + "/auth/registration", { user })
  //     .post("/auth/registration", user)
  //     .then((res) => console.log(res))
  //     .catch((error) => console.log(error));

  service.post("/auth/registration", user);
};
export { registerUser };
