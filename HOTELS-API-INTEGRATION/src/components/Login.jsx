import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    type: "owner",
  });

  const [response, setResponse] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8800/api/auth/login", user, {
        withCredentials: true,
      });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      // console.log(res.data.cookies);

      setResponse(res.data.message);
      // console.log(res);
    } catch (err) {
      // setResponse(err.response.data.message);
      console.log(response);
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" value={user.username} onChange={handleChange} required />
      </label>

      <label>
        Password:
        <input type="password" name="password" value={user.password} onChange={handleChange} required />
      </label>

      <button type="submit">LOG IN</button>

      <Link to="/createHOTEL" style={{ textDecoration: "none", color: "black" }}>
        <button>CREATE HOTEL</button>
      </Link>

      <h1>{response}</h1>
    </form>
  );
};

export default Login;
