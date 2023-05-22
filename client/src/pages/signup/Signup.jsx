import React from "react";
import { useState, useEffect } from "react";
import "../login/login.css";
import { Link, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import axios from "axios";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Signup = ({ inputs, title }) => {
  // const BASE_URL = "https://booking-com-api-o1kq.onrender.com/api";
  // const [file, setFile] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  // const navigate = useNavigate();
  // const [credentials, setCredentials] = useState({
  //   email: undefined,
  //   username: undefined,
  //   password: undefined,
  //   country: undefined,
  //   city: undefined,
  //   phone: undefined,
  // });

  // const handleChange = (e) => {
  //   setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   const data = new FormData();
  //   data.append("file", file);
  //   data.append("upload_preset", "uploads");
  //   try {
  //     const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dmkegm2ts/image/upload", data);
  //     const { url } = uploadRes.data;
  //     const newUser = {
  //       ...credentials,
  //       img: url,
  //     };
  //     const res = await axios.post(`${BASE_URL}/auth/register`, newUser);
  //     navigate("/login");
  //     setLoading(false);
  //   } catch (err) {
  //     setLoading(false);
  //     setError("Please consider reviewing your inputs, there seems an Error 🌋");
  //   }
  // };

  const [file, setFile] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);

  const [formData, setFormData] = useState({
    country: "",
    state: "",
    city: "",
  });

  const [hostels, setHostels] = useState([]);

  console.log(hostels);

  useEffect(() => {
    const getHostels = async () => {
      const res = await newRequest.get(`hostels`);
      console.log("setting hostels");
      setHostels(res.data);
      console.log(res.data);
    };
    getHostels();
  }, []);

  const [info, setInfo] = useState({
    username: "",
    password: "",
    country: "",
    state: "",
    city: "",
    contact: "",
    email: "",
    type: "user",
  });

  console.log(info);

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
      };

      console.log(newUser);

      const res = await newRequest.post("auth/register", newUser);

      toast.success("User Created Successfully");
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

  return (
    <div className="login">
      <form className="lContainer" onSubmit={handleClick}>
        {/* <div>
          <div className="left">
            <img className="userImage" src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" />
          </div>
          <div className="formInput">
            <label htmlFor="file">
              Image: <FontAwesomeIcon style={{ color: "#939393" }} icon={faFileImport} />
            </label>
            <input name="img" type="file" required id="file" onChange={(e) => setFile(e.target.files[0])} />
          </div>
        </div> */}

        {/* <div>
          <input required name="email" type="email" placeholder="email" id="email" onChange={handleChange} className="lInput" />
        <input required name="username" type="text" placeholder="username" id="username" onChange={handleChange} className="lInput" />
        <input required name="password" type="password" placeholder="password" id="password" onChange={handleChange} className="lInput" />
        <input required name="country" type="text" placeholder="country" id="country" onChange={handleChange} className="lInput" />
        <input required name="city" type="text" placeholder="city" id="city" onChange={handleChange} className="lInput" />
        <input required name="phone" type="text" placeholder="phone" id="phone" onChange={handleChange} className="lInput" />
        <button type="submit" disabled={loading} className="lButton">
          {loading ? "Loading" : "Sign UP"}
        </button>
        <span>
          Alreay registerred? please consider{" "}
          <Link to="/login" style={{ textDecoration: "none", color: "#0071c2" }}>
            loggig in!
          </Link>
        </span>
        {error && <span className="error">{error}</span>}
        </div> */}

        {inputs.map((input) => (
          <div className="formInput" key={input.id}>
            <label>{input.label}</label>
            <input onChange={handleChange} type={input.type} placeholder={input.placeholder} id={input.id} />
            {/* {input.label === "Username" && <span>{usernameError}</span>}
                  {input.label === "Email" && <span>{emailError}</span>} */}
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
            value={selectedState}
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

        <div className="formInput">
          <label>City:</label>
          {/* <input type="text" name="city" value={formData.city} onChange={handleChange} /> */}
          <select name="city" id="city" value={info.city} onChange={handleChange}>
            <option value="">Select a city</option>
            {cities.map((city, index) => (
              <option key={index} value={city.toLowerCase()}>
                {city}
              </option>
            ))}
            ``
          </select>
        </div>

        <button>SUBMIT</button>

        <button onClick={() => navigate("/")} className="lButton homebutton">
          Home Page
        </button>
      </form>
    </div>
  );
};

export default Signup;
