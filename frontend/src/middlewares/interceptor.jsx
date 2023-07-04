import React from 'react';
import axios from "axios";
import { getToken } from "../services/localStorageService";
import { ToastContainer, toast } from 'react-toastify';

const service = axios.create({
  baseURL: "http://localhost:5000",
});

// middleware for sending request
service.interceptors.request.use((req) => {
  console.log(req.url);

  if (req.url.includes("auth")) {
    req.headers["Authorization"] = `Bearer ${getToken("activeUserToken")}`;
  }
  return req;
});



  
  function fun(){
    const notify = () => toast("Wow so easy!");

    console.log('in fun');
    return (
      <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer />
      </div>
    );
  }

// middleware for getting response
service.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    // toast('hiii')
    console.log(err.response.data.message);
    fun()
  }
);

export default service;
