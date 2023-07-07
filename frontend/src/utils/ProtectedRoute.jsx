import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../services/localStorageService";

function ProtectedRoute() {
  return getToken("activeUserToken")!== null ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
