import "./App.css";
import Navbar from "./components/navbar/Navbar";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import AuthPage from "./pages/AuthPage/AuthPage";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./utils/ProtectedRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import Board from "./components/SlideBar/SlideBarPages/Board";
import Members from "./components/SlideBar/SlideBarPages/Members";
import Setting from "./components/SlideBar/SlideBarPages/Setting";
import SideBar from "./components/SlideBar/SideBar";
import Error from "./components/Error";

function App() {
  return (
    <div style={{ fontFamily: "Charlie Display, sans-serif" }}>
      <ToastContainer position="top-center" transition={Zoom} />
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/auth" element={<AuthPage />} />

          <Route path="/user" element={<ProtectedRoute />}>
            <Route path="" element={<SideBar />}>
              <Route path="board" element={<Board />} />
              <Route path="members" element={<Members />} />
              <Route path="setting" element={<Setting />} />
              <Route path="*" element={<Error />} />
            </Route>
          </Route>
          
        </Routes>

        {/* <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/auth" element={<AuthPage />} />

          <Route path="/user" element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />}></Route>
            <Route path="board" element={<Board />}></Route>
            <Route path="members" element={<Members />}></Route>
            <Route path="setting" element={<Setting />}></Route>
          </Route>
        </Routes> */}

        {/* <SideBar> */}

        {/* </SideBar> */}

        {/* <Routes>
          <Route path="/user" element={<SideBar />}>
            <Route path="board" element={<Board />} />
            <Route path="members" element={<Members />} />
            <Route path="setting" element={<Setting />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
