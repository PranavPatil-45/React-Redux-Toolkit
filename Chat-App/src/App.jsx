import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Home";

function App() {
  const { currentUser } = useSelector((state) => state.users);

  return (
    <Routes>
      <Route path="/" element={currentUser ? <Navigate to="/home" /> : <Navigate to="/signin" />} />
      <Route path="/signin" element={currentUser ? <Navigate to="/home" /> : <SignIn />} />
      <Route path="/signup" element={currentUser ? <Navigate to="/home" /> : <SignUp />} />
      <Route path="/home" element={currentUser ? <Home /> : <Navigate to="/signin" />} />
    </Routes>
  );
}

export default App;
