import "./updateUser.scss";
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
import { useParams } from "react-router-dom";

const UpdateUser = ({ inputs, title }) => {
  const BASE_URL = "https://booking-com-api-o1kq.onrender.com/api";
  const [file, setFile] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState();

  console.log(selectedState);
  console.log(cities);

  const { id } = useParams();

  // const [formData, setFormData] = useState({
  //   country: "",
  //   state: "",
  //   city: "",
  // });

  const [info, setInfo] = useState({
    username: "",
    password: "",
    country: "",
    state: "",
    city: "",
    contact: "",
    email: "",
  });

  console.log(info);

  useEffect(() => {
    const getUser = async () => {
      const res = await newRequest.get(`/users/${id}`);
      setInfo(res.data);
      setCity(res.data.city);
    };
    getUser();
  }, []);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    // const data = new FormData();
    // data.append("file", file);
    // data.append("upload_preset", "uploads");
    try {
      // const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dmkegm2ts/image/upload", data);

      // const { url } = uploadRes.data;

      const newUser = {
        ...info,
        // ...formData,
        type: "owner",
      };

      console.log(newUser);

      const res = await newRequest.put(`users/${info._id}`, newUser);

      toast.success("User updated successfully!");

      setTimeout(() => {
        navigate(-1);
      }, 1000);

      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(`${err.response.data.message}`);
      if (err.response.data.message === "Email is already taken") {
        setEmailError("Email is already taken");
        setUsernameError("");
      }
      if (err.response.data.message === "Username is already taken") {
        setUsernameError("Username is already taken");
        setEmailError("");
      }
    }
  };

  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    // Filter cities based on selected state
    let filteredCities = [];
    if (state === "punjab") {
      filteredCities = [
        "Faisalabad",
        "Lahore",
        "Ahmadpur East",
        "Arifwala",
        "Attock",
        "Bahawalnagar",
        "Bahawalpur",
        "Bhakkar",
        "Burewala",
        "Chakwal",
        "Chichawatni",
        "Chiniot",
        "Chishtian Mandi",
        "Chenab Nagar",
        "Daska",
        "Dera Ghazi Khan",
        "Gojra",
        "Gujar Khan",
        "Gujranwala",
        "Gujrat",
        "Hafizabad",
        "Hasan Abdal",
        "Hasilpur",
        "Haveli lakha",
        "Jaranwala",
        "Jhang Sadar",
        "Jhelum",
        "Kamoke",
        "Kasur",
        "Khanewal",
        "Khanpur",
        "Khushab",
        "Kot Addu",
        "Kotli",
        "Layyah",
        "Mailsi",
        "Mandi Bahauddin",
        "Mian Chunnu",
        "Mianwali",
        "Multan",
        "Muridike",
        "Murree",
        "Muzaffargarh",
        "Narowal",
        "Okara",
        "Pakpattan",
        "Pindi Bhattian",
        "Pirmahal",
        "Rahimyar Khan",
        "Rajanpur",
        "Rawalpindi",
        "Sadiqabad",
        "Safdar Abad",
        "Sahiwal",
        "Sargodha",
        "Shakargarh",
        "Sheikhüpura",
        "Sialkot",
        "Sohawa",
        "Talagang",
        "Toba Tek singh",
        "Vehari",
        "Wah",
        "Wazirabad",
      ];
    } else if (state === "sindh") {
      filteredCities = ["Badin", "Dadu", "Ghotki", "Hala", "Hyderabad", "Jacobabad", "Jamshoro", "Karachi", "Khairpur", "Larkana", "Mirpur Khas", "Mithi", "Nawabshah", "Ratodero", "Sanghar", "Shikarpur", "Sukkar", "Tando Adam", "Thatta", "Karachi"];
    } else if (state === "azad kashmir") {
      filteredCities = ["Bagh", "Bhimber", "Mirpur", "Muzaffarabad", "Pallandri"];
    } else if (state === "fata") {
      filteredCities = ["Ali Masjid", "Jamrud", "Jandola", "Kandhura", "Landi Kotal", "Miram Shah", "Parachinar", "Torkham", "Wana"];
    } else if (state === "islamabad") {
      filteredCities = ["Islamabad"];
    } else if (state === "kpk") {
      filteredCities = ["Abbottabad", "Bannu", "Batagram", "Buner", "Charsadda", "Chitral", "Darra Adam Khel", "Dera Ismail Khan", "Hangu", "Haripur", "Karak", "Kohat", "Kohistan", "Lakki Marwat", "Lower Dir", "Malakand", "Mansehra", "Mardan", "Mingaora", "Nowshera", "Peshawar", "Shangla", "Swabi", "Swat", "Tank", "Upper Dir"];
    } else if (state === "northern areas") {
      filteredCities = ["Askoley", "Chilas", "Ghanche", "Ghizer", "Gilgit", "Khaplu", "Skardu"];
    } else if (state === "balochistan") {
      filteredCities = ["Bela", "Gwadar", "Jiwani", "Kalat", "Khuzdar", "Lasbela", "Loralai", "Ormara", "Pasni", "Quetta"];
    }
    setCities(filteredCities);
  };

  /////dfvdfvfvf

  const [selectedCity, setSelectedCity] = useState("");

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div className="new">
      <ToastContainer />
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          {/* <div className="left">
            <img src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" />
          </div> */}
          <div className="right">
            <form>
              {/* <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} style={{ display: "none" }} />
              </div> */}

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input value={info[input.id]} onChange={handleChange} type={input.type} placeholder={input.placeholder} id={input.id} />
                  <span>{input.id === "username" && usernameError}</span>
                  <span>{input.id === "email" && emailError}</span>
                </div>
              ))}

              <div className="formInput">
                <label>Country:</label>
                <select name="country" id="country" value={info.country} onChange={handleChange}>
                  <option value="">Select Country</option>
                  <option value="pakistan">Pakistan</option>
                </select>
              </div>

              <div className="formInput">
                <label>State:</label>
                <select
                  name="state"
                  id="state"
                  // value={formData.state}
                  value={info.state || selectedState}
                  onChange={(e) => {
                    handleChange(e);
                    handleStateChange(e);
                  }}
                >
                  <option value="">Select State</option>
                  <option value="punjab">Punjab</option>
                  <option value="sindh">Sindh</option>
                  <option value="balochistan">Balochistan</option>
                  <option value="azad kashmir">Azad Kashmir</option>
                  <option value="fata">Federally Administered Tribal Areas (FATA)</option>
                  <option value="islamabad">Islamabad Capital Territory</option>
                  <option value="kpk">Khyber Pakhtunkhwa</option>
                  <option value="northern areas">Northern Areas</option>
                </select>
              </div>

              {/* <div className="formInput">
                <label>City:</label>
                <select name="city" id="city" value={info.city} onChange={handleChange}>
                  <option value="">Select a city</option>
                  {cities.map((city, index) => (
                    <option key={index} value={city.toLowerCase()}>
                      {city}
                    </option>
                  ))}
                </select>
              </div> */}

              <div className="formInput">
                <label>City:</label>
                <select name="city" id="city" value={selectedCity} onChange={handleCityChange}>
                  <option value="">Select a city</option>
                  {cities.map((city, index) => (
                    <option key={index} value={city.toLowerCase()}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div className="formInput">
                <label>City:</label>
                <select name="city" id="" value={info.city}>
                  <option value="">Select a city</option>
                  <option value={info.city.toLowerCase()}>{info.city}</option>
                </select>
              </div>

              <button onClick={handleClick}>{loading ? "Loading" : "Send"}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
