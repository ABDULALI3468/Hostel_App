import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.scss";

const Login = () => {
  const URL = "http://localhost:8800/api";
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
    type: ""
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:8800/api/auth/login", credentials, {
        withCredentials: true,
      });
      console.log(res);

      if (res.data.type !== "user") {
         dispatch({
           type: "LOGIN_SUCCESS",
           payload: { details: res.data.details, type: res.data.type },
         });

        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response });
    }
  };

  return (
    <div className="login">
      <form className="lContainer" onSubmit={handleClick}>
        <input type="text" placeholder="username" id="username" onChange={handleChange} className="lInput" required />
        <input type="password" placeholder="password" id="password" onChange={handleChange} className="lInput" required />
        <select id="type" value={credentials.type} onChange={handleChange} required>
          <option value="">Select your Role</option>
          <option value="admin">Admin</option>
          <option value="owner">Owner</option>
          <option value="manager">Manager</option>
        </select>
        <button type="submit" disabled={loading} className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </form>
    </div>
  );
};

export default Login;
