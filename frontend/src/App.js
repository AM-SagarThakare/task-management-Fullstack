//css
import "react-toastify/dist/ReactToastify.css";
import "~/styles/style.css";
//dependencies
import React from "react";
import { ToastContainer, Zoom } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// folders
import {
  Navbar,
  Board,
  Members,
  Setting,
  Error,
  BoardDetails,
} from "./components";
import { AuthPage, SideBar, Homepage } from "./pages";
import { ProtectedRoute, CheckToken } from "./utils";

function App() {
  return (
    <div style={{ fontFamily: "Charlie Display, sans-serif" }}>
      <ToastContainer
        position="top-center"
        transition={Zoom}
        autoClose={1000}
      />
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
              <Route path="board/:boardID" element={<BoardDetails />} />
              <Route path="members" element={<Members />} />
              <Route path="setting" element={<Setting />} />
              <Route path="*" element={<Error />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
