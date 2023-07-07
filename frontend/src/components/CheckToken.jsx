import React from "react";
import { getToken } from "../services/localStorageService";
import { Navigate, Outlet } from "react-router-dom";

function CheckToken() {
  console.log(getToken("activeUserToken"));
  return getToken("activeUserToken") == null ? <Outlet /> : <Navigate to="/user/board" />;
}

export default CheckToken;
