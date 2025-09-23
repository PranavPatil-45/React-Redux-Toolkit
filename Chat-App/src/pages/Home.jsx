import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../slices/userSlice";
import "./Home.css"; // Import CSS file

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
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">🏠 Home Page</h1>

        {currentUser && (
          <p className="home-welcome">
            Welcome, <span>{currentUser.email}</span>
          </p>
        )}

        <button onClick={handleSignOut} className="signout-btn">
          Sign Out
        </button>
      </div>
    </div>
  );
}
