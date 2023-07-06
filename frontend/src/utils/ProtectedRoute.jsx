import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../services/localStorageService";
import SideBar from "../components/SlideBar/SideBar";

function ProtectedRoute() {
  return getToken("activeUserToken") ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
