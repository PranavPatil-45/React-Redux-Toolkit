import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../slices/userSlice";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.users);

  const handleSignOut = async () => {
    try {
      await dispatch(signOut());
      navigate("/signin");
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      {currentUser && (
        <p>
          Welcome, {currentUser.email}
        </p>
      )}
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}
