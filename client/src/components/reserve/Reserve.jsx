import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState, useEffect } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const Reserve = ({ setOpen, hotelId }) => {
  // const URL = "https://booking-com-api-o1kq.onrender.com/api";

  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`rooms/getHostelRooms/${hotelId}`);
  const { data: hotelData } = useFetch(`hostels/find/${hotelId}`);


  const navigate = useNavigate();
  // const { dates } = useContext(SearchContext);

  // const getDatesInRange = (startDate, endDate) => {
  //   const start = new Date(startDate);
  //   const end = new Date(endDate);

  //   const date = new Date(start.getTime());

  //   const dates = [];

  //   while (date <= end) {
  //     dates.push(new Date(date).getTime());
  //     date.setDate(date.getDate() + 1);
  //   }

  //   return dates;
  // };

  // const alldates = getDatesInRange(dates[0]?.startDate, dates[0]?.endDate);

  console.log(selectedRooms);

  const handleClick = async () => {
    try {
      await newRequest.post(`rooms/bookroom/${selectedRooms}`);
      setOpen(false);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="reserve">
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
              {/* {item?.roomNumbers?.map((roomNumber, index) => ( */}
              {item.roomNumber && (
                <div className="room">
                  <label>{item.roomNumber}</label>
                  <input required type="checkbox" onChange={() => setSelectedRooms(item._id)} />
                  {/* <input required type="checkbox" onChange={handleSelect} disabled={!isAvailable(item.roomNumber)} /> */}
                </div>
              )}
              {/* ))} */}
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
