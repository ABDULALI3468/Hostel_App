import React from "react";
import { useState, useEffect } from "react";
import "../login/login.css";
import { Link, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import axios from "axios";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from "../../utils/toast";
import "./signup.css";


const Signup = ({ inputs, title }) => {
  
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
    
    try {
    

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
    <div className="container-login">
      <div className="login-box">
        <h2>Register</h2>
        <form onSubmit={handleClick}>
          <div className="user-box">
          {inputs.map((input) => (
          <div key={input.id}>
            <label>{input.label}</label>
            <input onChange={handleChange} type={input.type} placeholder={input.placeholder} id={input.id} />
            <span>{input.id === "username" && usernameError}</span>
            <span>{input.id === "email" && emailError}</span>
          </div>
        ))}
          </div>
          <div className="user-box">
          <select className="select" name="country" id="country" value={info.country} onChange={handleChange}>
            <option value="">Select Country</option>
            <option value="pakistan">Pakistan</option>
          </select>
          </div><br/><br/>
          <div className="user-box">
          <select className="select"
            name="state"
            id="state"
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
          </div><br/><br/>
          <div className="user-box">
          <select name="city" id="city" className="select" value={info.city} onChange={handleChange}>
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
        </form>
      </div>
    </div>

    // <div className="login">
    //   <ToastContainer />

    //   <form className="lContainer" onSubmit={handleClick}>
        
    //     {inputs.map((input) => (
    //       <div className="formInput" key={input.id}>
    //         <label>{input.label}</label>
    //         <input onChange={handleChange} type={input.type} placeholder={input.placeholder} id={input.id} />
    //         {/* {input.label === "Username" && <span>{usernameError}</span>}
    //               {input.label === "Email" && <span>{emailError}</span>} */}
    //         <span>{input.id === "username" && usernameError}</span>
    //         <span>{input.id === "email" && emailError}</span>
    //       </div>
    //     ))}

    //     <div className="formInput">
    //       <label>Country:</label>
    //       <select name="country" id="country" value={info.country} onChange={handleChange}>
    //         <option value="">Select Country</option>
    //         <option value="pakistan">Pakistan</option>
    //       </select>
    //     </div>

    //     <div className="formInput">
    //       <label>State:</label>
    //       <select
    //         name="state"
    //         id="state"
    //         // value={formData.state}
    //         value={selectedState}
    //         onChange={(e) => {
    //           handleChange(e);
    //           handleStateChange(e);
    //         }}
    //       >
    //         <option value="">Select State</option>
    //         <option value="punjab">Punjab</option>
    //         <option value="sindh">Sindh</option>
    //         <option value="balochistan">Balochistan</option>
    //         <option value="azad kashmir">Azad Kashmir</option>
    //         <option value="fata">Federally Administered Tribal Areas (FATA)</option>
    //         <option value="islamabad">Islamabad Capital Territory</option>
    //         <option value="kpk">Khyber Pakhtunkhwa</option>
    //         <option value="northern areas">Northern Areas</option>
    //       </select>
    //     </div>

    //     <div className="formInput">
    //       <label>City:</label>
    //       {/* <input type="text" name="city" value={formData.city} onChange={handleChange} /> */}
    //       <select name="city" id="city" value={info.city} onChange={handleChange}>
    //         <option value="">Select a city</option>
    //         {cities.map((city, index) => (
    //           <option key={index} value={city.toLowerCase()}>
    //             {city}
    //           </option>
    //         ))}
    //         ``
    //       </select>
    //     </div>

    //     <button>SUBMIT</button>
    //   </form>
    // </div>
  );
};

export default Signup;
