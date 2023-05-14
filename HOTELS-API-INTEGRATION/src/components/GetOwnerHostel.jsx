import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import upload from "../utils/upload";
import newRequest from "../utils/newRequest";
import { Link } from "react-router-dom";

const GetOwnerHostel = () => {
  // SELECT STATE AND CITIES
  const [hostels, setHostels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await newRequest.get("hostels/getHostelsByOwner");
      setHostels(res.data);
      console.log(res.data);
    };
    fetchData();
  }, []);

  return hostels?.map((hostel) => {
    return (
      <Link to={`/updateHOSTEL/${hostel._id}`} style={{ textDecoration: "none" }}>
        <div id={hostel._id}>
          <h2>{hostel.name}</h2>
          <p>{hostel._id}</p>
        </div>
      </Link>
    );
  });
};

export default GetOwnerHostel;
