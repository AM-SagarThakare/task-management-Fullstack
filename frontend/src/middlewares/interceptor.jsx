
import axios from "axios";
import { getToken } from "../services/localStorageService";

import { toast } from 'react-toastify';

const service = axios.create({
  baseURL: "http://localhost:5000",
});

// middleware for sending request
service.interceptors.request.use((req) => {

  if (req.url.includes("user")) { 
    req.headers["Authorization"] = `Bearer ${getToken("activeUserToken")}`;
  }

  return req;
});

// middleware for getting response
service.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    console.log(err.response.data.message);
    toast.error(err.response.data.message)
  }
);

export default service;
