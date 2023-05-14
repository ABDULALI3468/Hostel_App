import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserSIGNUP = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    country: "",
    city: "",
    // address: "",
    // cnic: "",
    // contact: "",
    type: "owner",
  });

  const navigate = useNavigate();

  const [response, setResponse] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8800/api/auth/register", user);

      setResponse(res.data.message);
      navigate("/login");
      console.log(res);
    } catch (err) {
      setResponse(err.response.data.message);
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
        Email:
        <input type="email" name="email" value={user.email} onChange={handleChange} required />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={user.password} onChange={handleChange} required />
      </label>
      <label>
        Country:
        <input type="text" name="country" value={user.country} onChange={handleChange} />
      </label>
      <label>
        City:
        <input type="text" name="city" value={user.city} onChange={handleChange} />
      </label>
      <label>
        Address:
        <input type="text" name="address" value={user.address} onChange={handleChange} />
      </label>
      <label>
        CNIC:
        <input type="text" name="cnic" value={user.cnic} onChange={handleChange} />
      </label>
      <label>
        Contact:
        <input type="text" name="contact" value={user.contact} onChange={handleChange} required />
      </label>
      <button type="submit">Sign Up</button>
      <h1>{response}</h1>
    </form>
  );
};

export default UserSIGNUP;
