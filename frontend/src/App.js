import "./App.css";
import Navbar from "./components/navbar/Navbar";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import AuthPage from "./pages/AuthPage/AuthPage";
import { Bounce, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div style={{ fontFamily: "Charlie Display, sans-serif" }}>
      <ToastContainer position="top-center" transition={Zoom}/>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
