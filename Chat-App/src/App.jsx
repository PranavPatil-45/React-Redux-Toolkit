import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Home";
import { listenToAuthChanges } from "./slices/userSlice";

function App() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(listenToAuthChanges());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route 
          path="/signin" 
          element={
            !currentUser ? <SignIn /> : <Navigate to="/home" replace />
          } 
        />
        <Route 
          path="/signup" 
          element={<SignUp />}
        />
        
        <Route 
          path="/home" 
          element={
            currentUser ? <Home /> : <Navigate to="/signin" replace />
          } 
        />
        
        <Route 
          path="/" 
          element={
            <Navigate to={currentUser ? "/home" : "/signup"} replace />
          } 
        />
        
        <Route 
          path="*" 
          element={
            <Navigate to={currentUser ? "/home" : "/signup"} replace />
          } 
        />
      </Routes>
    </>
  );
}

export default App;