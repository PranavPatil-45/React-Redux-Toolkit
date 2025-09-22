import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInUser } from "../../slices/userSlice";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, isLoading, error } = useSelector((state) => state.users);

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleSignIn = async () => {
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const resultAction = await dispatch(signInUser({ email, password }));
      
      if (signInUser.fulfilled.match(resultAction)) {
        navigate("/home");
      } else {
        console.error("Failed to sign in:", resultAction.error);
      }
    } catch (err) {
      console.error("Sign in error:", err);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/home");
    }
  }, [currentUser, navigate]);

  return (
    <div>
      <h1>Sign In Page</h1>
      <input type="email" ref={emailRef} placeholder="Email" />
      <input type="password" ref={passwordRef} placeholder="Password" />
      <button onClick={handleSignIn} disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign In"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
