import { useContext, useRef } from "react";
// import axios from "axios";
import { axiosInstance } from "../../config";

import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./Login.css";

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await axiosInstance.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <span className="login-title">Login</span>
      <form action="" className="login-form" onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" placeholder="Enter your username" ref={userRef} />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          ref={passwordRef}
        />
        <button className="login-button">Login</button>
      </form>
      <button
        className="login-register-button"
        type="submit"
        disabled={isFetching}
      >
        <Link to="/pg-react-blog-client-v2/register" className="link">
          Register
        </Link>
      </button>
    </div>
  );
};

export default Login;
