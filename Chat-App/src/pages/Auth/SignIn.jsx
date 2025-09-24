import React, { useRef } from "react";
import { signInUser } from "../../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SignIn() {
  const dispatch = useDispatch();

  const { users, currentUser, isLoading, error } = useSelector(
    (state) => state.users
  );

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleSignIn = async () => {
    console.log("check - 1");
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log(email);
    console.log(password);
    dispatch(signInUser({ email, password }));
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <input type="email" ref={emailRef} />
      <input type="text" ref={passwordRef} />
      <button onClick={handleSignIn}>Sign In</button>
      <h2>{isLoading}</h2>
    </div>
  );
}