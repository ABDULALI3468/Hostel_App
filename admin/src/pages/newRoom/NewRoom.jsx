import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { toast, ToastContainer } from "../../utils/toast";
import { useNavigate } from "react-router-dom";

// NEW IMPORTS COPIED
import upload from "../../utils/upload";
import newRequest from "../../utils/newRequest";

const NewRoom = () => {
  // const URL = "https://booking-com-api-o1kq.onrender.com/api";
  // const [info, setInfo] = useState({});
  // const [hotelId, setHotelId] = useState(undefined);
  // const [rooms, setRooms] = useState([]);
  // const [fetching, setFetching] = useState(false);

  const navigate = useNavigate();
  // const { data, loading, error } = useFetch(`${URL}/hostels`);

  // const handleChange = (e) => {
  //   setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  // };

  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   setFetching(true);
  //   const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
  //   try {
  //     await axios.post(`${URL}/rooms/${hotelId}`, { ...info, roomNumbers });
  //     setFetching(false);
  //     navigate("/rooms");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // COPIED CODE FROM INTEGRATION FOLDER

  const [selectedHostel, setSelectedHostel] = useState("");
  const [files, setFiles] = useState("");
  console.log(files);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [hostels, setHostels] = useState([]);

  const [dataLoaded, setDataLoaded] = useState(false);

  const [formData, setFormData] = useState({
    hostelId: "",
    type: "",
    floor_number: "",
    price: 0,
    maxPeople: 0,
    hostelites: [],
    status: [],
    desc: "",
    photos: [],
    rent_period: "",
    condition: "",
    // mess: false,
    mess: "",
    // roomNumbers: [],
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
  console.log(files);

  useEffect(() => {
    const getHostels = async () => {
      const res = await newRequest.get("/hostels");

      setHostels(res.data);
      setDataLoaded(true);
    };
    getHostels();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (files.length > 0 && files.length <= 5) {
      setUploading(true);

      try {
        const images = await Promise.all(
          [...files].map(async (file) => {
            const url = await upload(file);
            return url;
          })
        );
        setUploading(false);

        toast.success("Image/s Uploaded successfully!");

        setFormData((prevData) => ({
          ...prevData,
          photos: images,
        }));

        setUploaded(true);
      } catch (err) {
        toast.error("Image/s not uploaded");
        console.log(err);
      }
    } else {
      // console.log(err);
      toast.error("Your images need to be in a range of min 1 to max 5!");
    }
  };

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
    if (formData.photos.length === 0) {
      toast.error("Upload Hostel Images first");
    } else {
      try {
        const res = await newRequest.post(`rooms/${formData.hostelId}`, formData)
        toast.success("Room Created Successfully");
        setTimeout(() => {
          navigate(-1);
        }, 1000);
        console.log(res);
      } catch (err) {
        toast.error("Room not created");
        console.log(err);
      }
    }
  };

  return (
    <div className="new">
      <ToastContainer />
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            {/* <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleChange} />
                </div>
              ))}
              <div className="formInput">
                <label>Rooms</label>
                <textarea onChange={(e) => setRooms(e.target.value)} placeholder="give comma between room numbers." />
              </div>
              <div className="formInput">
                <label>Choose a hotel</label>
                <select id="hotelId" onChange={(e) => setHotelId(e.target.value)}>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((hotel) => (
                        <option key={hotel._id} value={hotel._id}>
                          {hotel.name}
                        </option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>{fetching ? "Loading" : "Send"}</button>
            </form> */}

            <form onSubmit={handleSubmit}>
              <button type="submit">SUBMIT THE FORM</button>
              <div>
                <label>
                  Hostel:
                  <select name="hostelId" value={formData.hostelId} onChange={handleChange}>
                    <option value="">Select a hostel</option>
                    {hostels?.length > 0 &&
                      hostels?.map((hostel, index) => {
                        return (
                          <option key={hostel._id} value={hostel._id}>
                            {hostel.name}
                          </option>
                        );
                      })}
                  </select>
                </label>
                {/* <label>
              Type:
              <input type="text" name="type" value={formData.type} onChange={handleChange} />
            </label> */}

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
                  Photos:
                  <input type="file" name="photos" multiple onChange={(e) => setFiles(e.target.files)} />
                </label>
                <button onClick={handleUpload}>UPLOAD IMAGES</button>
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
                  Room Number:
                  <input type="number" name="roomNumber" value={formData.roomNumber} onChange={handleChange} />
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

export default NewRoom;
