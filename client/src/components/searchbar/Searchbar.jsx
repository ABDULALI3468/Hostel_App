import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./searchbar.css";
// import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
const Searchbar = () => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleOption = (name, operation, e) => {
    e.preventDefault();
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
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

  const { dispatch } = useContext(SearchContext);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(destination);
    console.log(e.target);
    // dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    // navigate("/hostels", { state: { destination, dates, options } });
    dispatch({ type: "NEW_SEARCH", payload: { destination } });
    navigate("/hostels", { state: { destination } });
  };

  return (
    <div className="homePage">
      <form className="headerSearch" onSubmit={(e) => handleSearch(e)}>
        <div className="headerSearchItem">
          <FontAwesomeIcon icon={faBed} className="headerIcon" />
          {/* <input required name="destination" type="text" placeholder="Where are you going?" className="headerSearchInput" onChange={(e) => setDestination(e.target.value)} /> */}
          <select
            name="destination"
            id="state"
            // value={formData.state}
            value={selectedState}
            onChange={(e) => {
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
        <div className="headerSearchItem">
          <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
          {/* <input required name="destination" type="text" placeholder="Where are you going?" className="headerSearchInput" onChange={(e) => setDestination(e.target.value)} /> */}
          <select name="city" id="city" value={destination} onChange={(e) => setDestination(e.target.value)}>
            <option value="">Select a city</option>
            {cities.map((city, index) => (
              <option key={index} value={city.toLowerCase()}>
                {city}
              </option>
            ))}
          </select>
        </div>
        {/* <div className="headerSearchItem">
          <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
          <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
          {openDate && <DateRange editableDateInputs={true} onChange={(item) => setDates([item.selection])} moveRangeOnFirstSelection={false} ranges={dates} className="date" minDate={new Date()} />}
        </div> */}
        {/* <div className="headerSearchItem">
          <FontAwesomeIcon icon={faPerson} className="headerIcon" />
          <span onClick={() => setOpenOptions(!openOptions)} className="headerSearchText">{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
          {openOptions && (
            <div className="options">
              <div className="optionItem">
                <span className="optionText">Adult</span>
                <div className="optionCounter">
                  <button disabled={options.adult <= 1} className="optionCounterButton" onClick={(e) => handleOption("adult", "d", e)}>
                    -
                  </button>
                  <span className="optionCounterNumber">{options.adult}</span>
                  <button className="optionCounterButton" onClick={(e) => handleOption("adult", "i", e)}>
                    +
                  </button>
                </div>
              </div>
              <div className="optionItem">
                <span className="optionText">Children</span>
                <div className="optionCounter">
                  <button disabled={options.children <= 0} className="optionCounterButton" onClick={(e) => handleOption("children", "d", e)}>
                    -
                  </button>
                  <span className="optionCounterNumber">{options.children}</span>
                  <button className="optionCounterButton" onClick={(e) => handleOption("children", "i", e)}>
                    +
                  </button>
                </div>
              </div>
              <div className="optionItem">
                <span className="optionText">Room</span>
                <div className="optionCounter">
                  <button disabled={options.room <= 1} className="optionCounterButton" onClick={(e) => handleOption("room", "d", e)}>
                    -
                  </button>
                  <span className="optionCounterNumber">{options.room}</span>
                  <button className="optionCounterButton" onClick={(e) => handleOption("room", "i", e)}>
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div> */}
        <div className="headerSearchItem">
          <button type="submit" className="headerBtn">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
