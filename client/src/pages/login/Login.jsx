import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import newRequest from "../../utils/newRequest";
import "./login.css";

const Login = () => {
  // const URL = "https://booking-com-api-o1kq.onrender.com/api";

  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await newRequest.post(`/auth/login`, credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate('/');
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="login">
      <form className="lContainer" onSubmit={handleSubmit}>
        <input required name="username" type="text" placeholder="username" id="username" onChange={handleChange} className="lInput" />
        <input required name="password" type="password" placeholder="password" id="password" onChange={handleChange} className="lInput" />
        <button disabled={loading} className="lButton">
          Login
        </button>
        <span>
          Not have an account? please consider{" "}
          <Link to="/signup" style={{ textDecoration: "none", color: "#0071c2" }}>
            registering !
          </Link>{" "}
          yourself
        </span>
        {error && <span>{error.message}</span>}

        <button onClick={() => navigate("/")} className="lButton homebutton">
          Home Page
        </button>
      </form>
    </div>
  );
};

export default Login;
