import React, { useRef } from "react";
import { addUser } from "../../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SignUp() {
  const { currentUser } = useSelector((state) => state.users);
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const dispatch = useDispatch();

  const handleSignUp = () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    dispatch(addUser({ name, email, password }));
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
        <h1 style={{ marginBottom: "20px", color: "#333" }}>Sign Up</h1>
        {currentUser?.id && (
          <h2 style={{ fontSize: "14px", color: "green" }}>
            User ID: {currentUser.id}
          </h2>
        )}
        <input
          type="text"
          placeholder="Name"
          ref={nameRef}
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
          onClick={handleSignUp}
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
            (e.target.style.background = "linear-gradient(135deg, #764ba2, #667eea)")
          }
          onMouseOut={(e) =>
            (e.target.style.background = "linear-gradient(135deg, #667eea, #764ba2)")
          }
        >
          Sign Up
        </button>

        <p style={{ marginTop: "20px", fontSize: "14px", color: "#555" }}>
          Already have an account?{" "}
          <a href="/signin" style={{ color: "#667eea", fontWeight: "bold" }}>
            Sign In
          </a>
        </p>

        {/* <button
          onClick={() => dispatch(createChat())}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            background: "#f4f4f4",
            border: "1px solid #ccc",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Create Chat
        </button> */}
      </div>
    </div>
  );
}
