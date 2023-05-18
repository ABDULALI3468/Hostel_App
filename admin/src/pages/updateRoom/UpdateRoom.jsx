import "./updateRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// NEW IMPORTS COPIED
import upload from "../../utils/upload";
import newRequest from "../../utils/newRequest";
import { useParams } from "react-router-dom";

const UpdateRoom = () => {
  const { id } = useParams();

  const [dataLoaded, setDataLoaded] = useState(false);
  const [formData, setFormData] = useState({
    // hostelId: "",
    // type: "",
    floor_number: "",
    price: 0,
    maxPeople: 0,
    // hostelites: [],
    // status: [],
    desc: "",
    photos: [],
    rent_period: "",
    condition: "",
    mess: "",
    roomNumber: "",
    room_facilities: {
      electricity_backup: false,
      security_cameras: false,
      wifi: false,
      breakfast: false,
      lunch: false,
      dinner: false,
      geyser: false,
      attach_bath: false,
      cupboard: false,
      parking: false,
      tv_lounge: false,
      internet: false,
      telephone: false,
      security_guard: false,
      kitchen: false,
      doorman: false,
      safety_fire: false,
      garden: false,
      washer: false,
      fridge: false,
      oven: false,
      air_cooler: false,
      roof_top: false,
      outdoor_sitting: false,
      laundry: false,
      heating: false,
      pool: false,
      gym: false,
      non_smooking: false,
      pets_allowed: false,
    },
  });

  console.log(formData);

  useEffect(() => {
    const getRoom = async () => {
      const res = await newRequest.get(`/rooms/${id}`);
      setFormData(res.data);
      setDataLoaded(true);
    };
    getRoom();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFacilitiesChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      room_facilities: {
        ...prevData.room_facilities,
        [name]: checked,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (formData.photos.length === 0) {
    //   console.log("UPLOAD IMAGES FIRST");
    // } else {
    try {
      const res = await newRequest.put(`rooms/${formData._id}`, formData, {
        withCredentials: true,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    // }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit}>
              <button type="submit">SUBMIT THE FORM</button>

              <div>
                <label>
                  Floors:
                  <select name="floor_number" value={formData.floor_number} onChange={handleChange}>
                    <option value="">Floors</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </label>

                <label>
                  Price:
                  <input type="number" name="price" value={formData.price} onChange={handleChange} />
                </label>
                <label>
                  Max People:
                  <input type="number" name="maxPeople" value={formData.maxPeople} onChange={handleChange} />
                </label>
                {/* <label>
              Hostelites:
              <input type="text" name="hostelites" value={formData.hostelites} onChange={handleChange} />
            </label> */}
                {/* <label>
              Status:
              <input type="text" name="status" value={formData.status} onChange={handleChange} />
            </label> */}
                <label>
                  Description:
                  <textarea name="desc" value={formData.desc} onChange={handleChange} />
                </label>

                <label>
                  Rent Period:
                  <select name="rent_period" value={formData.rent_period} onChange={handleChange}>
                    <option value="">Select a rent period</option>
                    <option value="per night">Per Night</option>
                    <option value="per week">Per Week</option>
                    <option value="every 2 weeks">Every 2 Weeks</option>
                    <option value="per month">Per Month</option>
                    <option value="per 2 months">Per 2 Months</option>
                    <option value="per 6 months">Per 6 Months</option>
                    <option value="annually">Annually</option>
                  </select>
                </label>
                <label>
                  Condition:
                  <select name="condition" value={formData.condition} onChange={handleChange}>
                    <option value="">Select a condition</option>
                    <option value="furnished">Furnished</option>
                    <option value="semi-furnished">Semi-Furnished</option>
                    <option value="not-furnished">Not-Furnished</option>
                  </select>
                </label>
                {/* <label>
              Mess:
              <input type="checkbox" name="mess" checked={formData.mess} onChange={handleChange} />
            </label> */}

                <label>
                  Mess:
                  <select name="mess" value={formData.mess} onChange={handleChange}>
                    <option value="">Mess</option>
                    <option value="mess included">Included</option>
                    <option value="mess not-included">Not-Included</option>
                  </select>
                </label>

                <label>
                  Room Numbers:
                  <input type="text" name="roomNumbers" value={formData.roomNumber} onChange={handleChange} />
                </label>
              </div>

              <div className="general_facilities">
                <label>
                  <input type="checkbox" name="electricity_backup" checked={formData.room_facilities.electricity_backup} onChange={handleFacilitiesChange} />
                  Electricity Backup
                </label>
                <label>
                  <input type="checkbox" name="security_cameras" checked={formData.room_facilities.security_cameras} onChange={handleFacilitiesChange} />
                  Security Cameras
                </label>
                <label>
                  <input type="checkbox" name="wifi" checked={formData.room_facilities.wifi} onChange={handleFacilitiesChange} />
                  WiFi
                </label>
                <label>
                  <input type="checkbox" name="breakfast" checked={formData.room_facilities.breakfast} onChange={handleFacilitiesChange} />
                  Breakfast
                </label>
                <label>
                  <input type="checkbox" name="lunch" checked={formData.room_facilities.lunch} onChange={handleFacilitiesChange} />
                  Lunch
                </label>
                <label>
                  <input type="checkbox" name="dinner" checked={formData.room_facilities.dinner} onChange={handleFacilitiesChange} />
                  Dinner
                </label>
                <label>
                  <input type="checkbox" name="geyser" checked={formData.room_facilities.geyser} onChange={handleFacilitiesChange} />
                  Geyser
                </label>
                <label>
                  <input type="checkbox" name="attach_bath" checked={formData.room_facilities.attach_bath} onChange={handleFacilitiesChange} />
                  Attached Bathroom
                </label>
                <label>
                  <input type="checkbox" name="cupboard" checked={formData.room_facilities.cupboard} onChange={handleFacilitiesChange} />
                  Cupboard
                </label>
                <label>
                  <input type="checkbox" name="parking" checked={formData.room_facilities.parking} onChange={handleFacilitiesChange} />
                  Parking
                </label>
                <label>
                  <input type="checkbox" name="tv_lounge" checked={formData.room_facilities.tv_lounge} onChange={handleFacilitiesChange} />
                  TV Lounge
                </label>
                <label>
                  <input type="checkbox" name="internet" checked={formData.room_facilities.internet} onChange={handleFacilitiesChange} />
                  Internet
                </label>
                <label>
                  <input type="checkbox" name="telephone" checked={formData.room_facilities.telephone} onChange={handleFacilitiesChange} />
                  Telephone
                </label>
                <label>
                  <input type="checkbox" name="security_guard" checked={formData.room_facilities.security_guard} onChange={handleFacilitiesChange} />
                  Security Guard
                </label>
                <label>
                  <input type="checkbox" name="kitchen" checked={formData.room_facilities.kitchen} onChange={handleFacilitiesChange} />
                  Kitchen
                </label>
                <label>
                  <input type="checkbox" name="doorman" checked={formData.room_facilities.doorman} onChange={handleFacilitiesChange} />
                  Doorman
                </label>
                <label>
                  <input type="checkbox" name="safety_fire" checked={formData.room_facilities.safety_fire} onChange={handleFacilitiesChange} />
                  Safety Fire
                </label>
                <label>
                  <input type="checkbox" name="garden" checked={formData.room_facilities.garden} onChange={handleFacilitiesChange} />
                  Garden
                </label>
                <label>
                  <input type="checkbox" name="washer" checked={formData.room_facilities.washer} onChange={handleFacilitiesChange} />
                  Washer
                </label>
                <label>
                  <input type="checkbox" name="fridge" checked={formData.room_facilities.fridge} onChange={handleFacilitiesChange} />
                  Fridge
                </label>
                <label>
                  <input type="checkbox" name="oven" checked={formData.room_facilities.oven} onChange={handleFacilitiesChange} />
                  Oven
                </label>
                <label>
                  <input type="checkbox" name="air_cooler" checked={formData.room_facilities.air_cooler} onChange={handleFacilitiesChange} />
                  Air Cooler
                </label>
                <label>
                  <input type="checkbox" name="roof_top" checked={formData.room_facilities.roof_top} onChange={handleFacilitiesChange} />
                  Roof Top
                </label>
                <label>
                  <input type="checkbox" name="outdoor_sitting" checked={formData.room_facilities.outdoor_sitting} onChange={handleFacilitiesChange} />
                  Outdoor Siting
                </label>
                <label>
                  <input type="checkbox" name="laundry" checked={formData.room_facilities.laundry} onChange={handleFacilitiesChange} />
                  Laundry
                </label>
                <label>
                  <input type="checkbox" name="heating" checked={formData.room_facilities.heating} onChange={handleFacilitiesChange} />
                  Heating
                </label>
                <label>
                  <input type="checkbox" name="pool" checked={formData.room_facilities.pool} onChange={handleFacilitiesChange} />
                  Pool
                </label>
                <label>
                  <input type="checkbox" name="gym" checked={formData.room_facilities.gym} onChange={handleFacilitiesChange} />
                  Gym
                </label>
                <label>
                  <input type="checkbox" name="non_smooking" checked={formData.room_facilities.non_smooking} onChange={handleFacilitiesChange} />
                  Non Smooking
                </label>
                <label>
                  <input type="checkbox" name="pets_allowed" checked={formData.room_facilities.pets_allowed} onChange={handleFacilitiesChange} />
                  Pets Allowed
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateRoom;
