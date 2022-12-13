import { Link } from "react-router-dom";
import { useState } from "react";
// import axios from "axios";
import { axiosInstance } from "../../config";

import "./Register.css";

const Register = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(false);
    try {
      const response = await axiosInstance.post("/auth/register", {
        username,
        email,
        password,
      });
      response.data &&
        window.location.replace("/pg-react-blog-client-v2/login");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="register">
      <span className="register-title">Register</span>
      <form action="" className="register-form" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          onChange={(event) => setUserName(event.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email address"
          onChange={(event) => setEmail(event.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className="register-button">Register</button>
      </form>
      <button className="register-login-button" type="submit">
        <Link to="/pg-react-blog-client-v2/login" className="link">
          Login
        </Link>
      </button>
      {error && (
        <span style={{ color: "tomato", marginTop: "10px" }}>
          Something went wrong!
        </span>
      )}
    </div>
  );
};

export default Register;
