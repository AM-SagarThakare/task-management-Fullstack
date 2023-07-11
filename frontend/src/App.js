import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Navbar, SideBar } from "./components";

import React from "react";
import Homepage from "./pages/Homepage/Homepage";
import AuthPage from "./pages/AuthPage/AuthPage";
import { ToastContainer, Zoom } from "react-toastify";
import ProtectedRoute from "./utils/ProtectedRoute";
import Board from "./components/SideBarMenu/Board";
import Members from "./components/SideBarMenu/Members";
import Setting from "./components/SideBarMenu/Setting";
import Error from "./components/Error/Error";
import CheckToken from "./components/CheckToken";
import '~/styles/style.css'

function App() {
  return (
    <div style={{ fontFamily: "Charlie Display, sans-serif" }} className="bg-dark primary-color">
      <ToastContainer position="top-center" transition={Zoom} />
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<CheckToken />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/auth" element={<AuthPage />} />
          </Route>

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
