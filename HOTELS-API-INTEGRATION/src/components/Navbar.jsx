import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <button>REGISTER</button>
      </Link>
      <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
        <button>LOGIN</button>
      </Link>
      <Link to="/createHOTEL" style={{ textDecoration: "none", color: "inherit" }}>
        <button>CREATE HOTELS</button>
      </Link>
      <Link to="/getHostel" style={{ textDecoration: "none", color: "inherit" }}>
        <button>GET HOSTELS</button>
      </Link>
    </div>
  );
};

export default Navbar;
