import axios from "axios";
import { getToken } from "../services/localStorageService";

import { toast } from "react-toastify";

const service = axios.create({
  baseURL: "http://localhost:5000",
});

// middleware for sending request
service.interceptors.request.use((req) => {
  console.log('in request');
  if (req.url.includes("user")) {
    req.headers["Authorization"] = `Bearer ${getToken("activeUserToken")}`;
  }

  return req;
});

// middleware for getting response
service.interceptors.response.use(
  (res) => {
    // console.log("interceptor res", res);
    return res;
  },
  function (err) {
    console.log("interceptor res", err);
    toast.error(err?.response?.data?.message);
    return Promise.reject(err);
  }
);

export default service;
