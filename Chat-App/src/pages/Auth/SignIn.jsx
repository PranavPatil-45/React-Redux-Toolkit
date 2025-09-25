import React, { useRef } from "react";
import { signInUser } from "../../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SignIn() {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.users);

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleSignIn = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
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

        <input
          type="email"
          placeholder="Email"
          ref={emailRef}
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
          onClick={handleSignIn}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) =>
            (e.target.style.background =
              "linear-gradient(135deg, #764ba2, #667eea)")
          }
          onMouseOut={(e) =>
            (e.target.style.background =
              "linear-gradient(135deg, #667eea, #764ba2)")
          }
        >
          {!isLoading ? "Signing In..." : "Sign In"}
        </button>

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
