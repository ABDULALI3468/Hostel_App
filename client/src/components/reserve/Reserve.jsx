import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState, useEffect } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import { toast, ToastContainer } from "../../utils/toast";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`rooms/getHostelRooms/${hotelId}`);
  const { data: hotelData } = useFetch(`hostels/find/${hotelId}`);

  const navigate = useNavigate();

  console.log(selectedRooms);

  const handleClick = async () => {
    try {
      await newRequest.post(`rooms/bookroom/${selectedRooms}`);
      toast.success("Booking request send to Hostel Manger/Owner");
      setTimeout(() => {
        setOpen(false);
        navigate("/");
      }, 1000);
    } catch (err) {
      toast.error(err.response.data.error);
      toast.error("Unfortunately, Room is not booked");
      console.log(err);
    }
  };
  return (
    <div className="reserve">
      <ToastContainer />
      <div className="rContainer">
        <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() => setOpen(false)} />
        <span>Select your rooms:</span>
        {data?.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">Rs-/{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumber && (
                <div className="room">
                  <label>{item.roomNumber}</label>
                  <input required type="checkbox" onChange={() => setSelectedRooms(item._id)} />
                  {/* <input required type="checkbox" onChange={handleSelect} disabled={!isAvailable(item.roomNumber)} /> */}
                </div>
              )}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
