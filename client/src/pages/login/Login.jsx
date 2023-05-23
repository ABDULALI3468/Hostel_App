// import axios from "axios";
// import { useContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
// import newRequest from "../../utils/newRequest";
// import "./login.css";

// const Login = () => {
//   // const URL = "https://booking-com-api-o1kq.onrender.com/api";

//   const [credentials, setCredentials] = useState({
//     username: undefined,
//     password: undefined,
//   });

//   const { loading, error, dispatch } = useContext(AuthContext);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     dispatch({ type: "LOGIN_START" });
//     try {
//       const res = await newRequest.post(`/auth/login`, credentials);
//       dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
//       navigate('/');
//     } catch (err) {
//       dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
//     }
//   };

//   return (
//     <div className="login">
//       <form className="lContainer" onSubmit={handleSubmit}>
//         <input required name="username" type="text" placeholder="username" id="username" onChange={handleChange} className="lInput" />
//         <input required name="password" type="password" placeholder="password" id="password" onChange={handleChange} className="lInput" />
//         <button disabled={loading} className="lButton">
//           Login
//         </button>
//         <span>
//           Not have an account? please consider{" "}
//           <Link to="/signup" style={{ textDecoration: "none", color: "#0071c2" }}>
//             registering !
//           </Link>{" "}
//           yourself
//         </span>
//         {error && <span>{error.message}</span>}

//         <button onClick={() => navigate("/")} className="lButton homebutton">
//           Home Page
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;


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
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await newRequest.post(`/auth/login`, credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="container-login">
      <div className="login-box">
        <h2>Dashboard Access</h2>
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input type="text" name="username" placeholder="username" id="username" onChange={handleChange} required />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input type="password" name="password" placeholder="password" id="password" onChange={handleChange} required />
            <label>Password</label>
          </div>
          <button disabled={loading} className="lButton">
            Login
          </button>
          {error && <span>{error.message}</span>}
        </form>
      </div>
    </div>
  );
};

export default Login;


