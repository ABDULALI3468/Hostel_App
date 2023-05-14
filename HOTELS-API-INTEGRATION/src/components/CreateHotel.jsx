import React, { useState } from "react";
import axios from "axios";
import upload from "../utils/upload";
import newRequest from "../utils/newRequest";

const CreateHotel = () => {
  // SELECT STATE AND CITIES
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);

  const [files, setFiles] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    cat: "",
    country: "",
    state: "",
    city: "",
    address: "",
    photos: [],
    desc: "",
    rating: 0,
    rooms: [],
    cheapestPrice: 0,
    featured: false,
    hostel_size: "",
    rent_period: "",
    condition: "",
    mess: false,
    floors: "",
  });

  const [facilities, setFacilities] = useState({
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
  });

  const handleUpload = async () => {
    if (files.length > 0 && files.length <= 3) {
      setUploading(true);

      try {
        const images = await Promise.all(
          [...files].map(async (file) => {
            const url = await upload(file);
            return url;
          })
        );
        setUploading(false);

        setFormData((prevData) => ({
          ...prevData,
          photos: images,
        }));

        setUploaded(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("You files need to be in a range of min 0 to max 3!");
    }
  };

  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log(selectedState);

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

  const handleFacilitiesChange = (e) => {
    const { name, checked } = e.target;
    setFacilities((prevFacilities) => ({
      ...prevFacilities,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.photos.length === 0) {
      console.log("UPLOAD IMAGES FIRST");
    } else {
      const data = {
        ...formData,
        general_facilities: facilities,
      };
      console.log(data);
      try {
        // newRequest.post("/reviews", review);
        const res = await newRequest.post("hostels", data);
        console.log(res);
        // console.log(res.data);
      } catch (err) {
        console.log(err);
        // console.log(err.response.data);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit" disabled={formData.photos.length === 0}>
          SUBMIT THE FORM
        </button>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Category:
          <select name="cat" value={formData.cat} onChange={handleChange}>
            <option value="">Select Category</option>
            <option value="boys hostel">Boys Hostel</option>
            <option value="girls hostel">Girls Hostel</option>
          </select>
        </label>
        <label>
          Country:
          <select name="country" value={formData.country} onChange={handleChange}>
            <option value="">Select Country</option>
            <option value="pakistan">Pakistan</option>
          </select>
        </label>
        <label>
          State:
          <select
            name="state"
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
        </label>

        <label>
          City:
          {/* <input type="text" name="city" value={formData.city} onChange={handleChange} /> */}
          <select name="city" value={formData.city} onChange={handleChange}>
            <option value="">Select a city</option>
            {cities.map((city, index) => (
              <option key={index} value={city.toLowerCase()}>
                {city}
              </option>
            ))}
          </select>
        </label>
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </label>
        <label>
          Photos:
          <input type="file" name="photos" multiple onChange={(e) => setFiles(e.target.files)} />
        </label>
        <button disabled={uploading || uploaded} type="submit" onClick={handleUpload}>
          UPLOAD PHOTOS
        </button>
        <label>
          Description:
          <textarea name="desc" value={formData.desc} onChange={handleChange}></textarea>
        </label>
        <label>
          Cheapest Price:
          <input type="number" name="cheapestPrice" value={formData.cheapestPrice} onChange={handleChange} />
        </label>

        <label>
          Hostel Size:
          {/* <input type="text" name="hostel_size" value={formData.hostel_size} onChange={handleChange} /> */}
          <select name="hostel_size" value={formData.hostel_size} onChange={handleChange}>
            <option value="">Select Hostel Size</option>
            <option value="less than 2.5 Marla">less than 2.5 Marla</option>
            <option value="2.5-5 Marla">2.5-5 Marla</option>
            <option value="5-10 Marla">5-10 Marla</option>
            <option value="10-15 Marla">10-15 Marla</option>
            <option value="15-20 Marla">15-20 Marla</option>
            <option value="1-2 Canal">1-2 Canal</option>
            <option value="2-3 Canal">2-3 Canal</option>
            <option value="3-4 Canal">3-4 Canal</option>
            <option value="In Plaza">In Plaza</option>
          </select>
        </label>
        <label>
          Rent Period:
          {/* <input type="text" name="rent_period" value={formData.rent_period} onChange={handleChange} /> */}
          <select name="rent_period" value={formData.rent_period} onChange={handleChange}>
            <option value="">Rent Period</option>
            <option value="per night">Per Night</option>
            <option value="per week">Per Week</option>
            <option value="every 2 weeks">Every 2 Weeks</option>
            <option value="per month">Per Month</option>
            <option value="per 2 months">After 2 Months</option>
            <option value="per 6 months">After 6 Months</option>
            <option value="annualy">Anually</option>
          </select>
        </label>
        <label>
          Condition:
          {/* <input type="text" name="condition" value={formData.condition} onChange={handleChange} /> */}
          <select name="condition" value={formData.condition} onChange={handleChange}>
            <option value="">Condition</option>
            <option value="furnished">Furnished</option>
            <option value="semi-furnished">Semi-Furnished</option>
            <option value="not-furnished">Not-Furnished</option>
          </select>
        </label>
        <label>
          Mess:
          {/* <input type="text" name="mess" value={formData.mess} onChange={handleChange} /> */}
          <select name="mess" value={formData.mess} onChange={handleChange}>
            <option value="">Mess</option>
            <option value="mess included">Included</option>
            <option value="mess not-included">Not-Included</option>
          </select>
        </label>
        <label>
          Floors:
          {/* <input type="text" name="floors" value={formData.floors} onChange={handleChange} /> */}
          <select name="floors" value={formData.floors} onChange={handleChange}>
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

        <h1>General Facilities:</h1>

        <label>
          <input type="checkbox" name="electricity_backup" checked={facilities.electricity_backup} onChange={handleFacilitiesChange} />
          Electricity Backup
        </label>
        <label>
          <input type="checkbox" name="security_cameras" checked={facilities.security_cameras} onChange={handleFacilitiesChange} />
          Security Cameras
        </label>
        <label>
          <input type="checkbox" name="wifi" checked={facilities.wifi} onChange={handleFacilitiesChange} />
          WiFi
        </label>
        <label>
          <input type="checkbox" name="breakfast" checked={facilities.breakfast} onChange={handleFacilitiesChange} />
          Breakfast
        </label>
        <label>
          <input type="checkbox" name="lunch" checked={facilities.lunch} onChange={handleFacilitiesChange} />
          Lunch
        </label>
        <label>
          <input type="checkbox" name="dinner" checked={facilities.dinner} onChange={handleFacilitiesChange} />
          Dinner
        </label>
        <label>
          <input type="checkbox" name="geyser" checked={facilities.geyser} onChange={handleFacilitiesChange} />
          Geyser
        </label>
        <label>
          <input type="checkbox" name="attach_bath" checked={facilities.attach_bath} onChange={handleFacilitiesChange} />
          Attached Bathroom
        </label>
        <label>
          <input type="checkbox" name="cupboard" checked={facilities.cupboard} onChange={handleFacilitiesChange} />
          Cupboard
        </label>
        <label>
          <input type="checkbox" name="parking" checked={facilities.parking} onChange={handleFacilitiesChange} />
          Parking
        </label>
        <label>
          <input type="checkbox" name="tv_lounge" checked={facilities.tv_lounge} onChange={handleFacilitiesChange} />
          TV Lounge
        </label>
        <label>
          <input type="checkbox" name="internet" checked={facilities.internet} onChange={handleFacilitiesChange} />
          Internet
        </label>
        <label>
          <input type="checkbox" name="telephone" checked={facilities.telephone} onChange={handleFacilitiesChange} />
          Telephone
        </label>
        <label>
          <input type="checkbox" name="security_guard" checked={facilities.security_guard} onChange={handleFacilitiesChange} />
          Security Guard
        </label>
        <label>
          <input type="checkbox" name="kitchen" checked={facilities.kitchen} onChange={handleFacilitiesChange} />
          Kitchen
        </label>
        <label>
          <input type="checkbox" name="doorman" checked={facilities.doorman} onChange={handleFacilitiesChange} />
          Doorman
        </label>
        <label>
          <input type="checkbox" name="safety_fire" checked={facilities.safety_fire} onChange={handleFacilitiesChange} />
          Safety Fire
        </label>
        <label>
          <input type="checkbox" name="garden" checked={facilities.garden} onChange={handleFacilitiesChange} />
          Garden
        </label>
        <label>
          <input type="checkbox" name="washer" checked={facilities.washer} onChange={handleFacilitiesChange} />
          Washer
        </label>
        <label>
          <input type="checkbox" name="fridge" checked={facilities.fridge} onChange={handleFacilitiesChange} />
          Fridge
        </label>
        <label>
          <input type="checkbox" name="oven" checked={facilities.oven} onChange={handleFacilitiesChange} />
          Oven
        </label>
        <label>
          <input type="checkbox" name="air_cooler" checked={facilities.air_cooler} onChange={handleFacilitiesChange} />
          Air Cooler
        </label>
        <label>
          <input type="checkbox" name="roof_top" checked={facilities.roof_top} onChange={handleFacilitiesChange} />
          Roof Top
        </label>
        <label>
          <input type="checkbox" name="outdoor_sitting" checked={facilities.outdoor_sitting} onChange={handleFacilitiesChange} />
          Outdoor Siting
        </label>
        <label>
          <input type="checkbox" name="laundry" checked={facilities.laundry} onChange={handleFacilitiesChange} />
          Laundry
        </label>
        <label>
          <input type="checkbox" name="heating" checked={facilities.heating} onChange={handleFacilitiesChange} />
          Heating
        </label>
        <label>
          <input type="checkbox" name="pool" checked={facilities.pool} onChange={handleFacilitiesChange} />
          Pool
        </label>
        <label>
          <input type="checkbox" name="gym" checked={facilities.gym} onChange={handleFacilitiesChange} />
          Gym
        </label>
        <label>
          <input type="checkbox" name="non_smooking" checked={facilities.non_smooking} onChange={handleFacilitiesChange} />
          Non Smooking
        </label>
        <label>
          <input type="checkbox" name="pets_allowed" checked={facilities.pets_allowed} onChange={handleFacilitiesChange} />
          Pets Allowed
        </label>
      </form>
    </div>
  );
};

export default CreateHotel;
