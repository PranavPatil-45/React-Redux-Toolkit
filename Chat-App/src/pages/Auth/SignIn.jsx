import React, { useRef, useEffect } from "react";
import { signInUser } from "../../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; 

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { isLoading, error, currentUser } = useSelector((state) => state.users);

  const emailRef = useRef("");
  const passwordRef = useRef("");

  useEffect(() => {
    if (currentUser && Object.keys(currentUser).length > 0) {
      navigate("/"); 
    }
  }, [currentUser, navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault(); 
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    
    dispatch(signInUser({ email, password }));
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "12px",
          width: "350px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "20px", color: "#333" }}>Sign In</h1>

        <form onSubmit={handleSignIn}>
          <input
            type="email"
            placeholder="Email"
            ref={emailRef}
            required
            style={{
              width: "100%",
              padding: "12px",
              margin: "8px 0",
              borderRadius: "8px",
              border: "1px solid #ddd",
              outline: "none",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            ref={passwordRef}
            required
            style={{
              width: "100%",
              padding: "12px",
              margin: "8px 0",
              borderRadius: "8px",
              border: "1px solid #ddd",
              outline: "none",
            }}
          />

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "15px",
              background: isLoading 
                ? "#ccc" 
                : "linear-gradient(135deg, #667eea, #764ba2)",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              fontWeight: "bold",
              cursor: isLoading ? "not-allowed" : "pointer",
              transition: "0.3s",
              opacity: isLoading ? 0.7 : 1,
            }}
            onMouseOver={(e) => {
              if (!isLoading) {
                e.target.style.background = "linear-gradient(135deg, #764ba2, #667eea)";
              }
            }}
            onMouseOut={(e) => {
              if (!isLoading) {
                e.target.style.background = "linear-gradient(135deg, #667eea, #764ba2)";
              }
            }}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {error && (
          <p style={{ marginTop: "10px", color: "red", fontSize: "14px" }}>
            {error}
          </p>
        )}

        <p style={{ marginTop: "20px", fontSize: "14px", color: "#555" }}>
          Not having an account?{" "}
          <a href="/signup" style={{ color: "#667eea", fontWeight: "bold" }}>
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}