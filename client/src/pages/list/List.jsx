import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import Spinner from "../../components/spinner/Spinner";
import newRequest from "../../utils/newRequest";

const List = () => {
  const URL = "https://booking-com-api-o1kq.onrender.com/api";

  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination || null);
  const [dates, setDates] = useState(location.state.dates || null);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options || null);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
    const [selectedState, setSelectedState] = useState("");
    const [cities, setCities] = useState([]);

  let { data, loading, error, reFetch } = useFetch(`hostels?${destination || location.state.city ? `city=${destination || location.state.city}` : ""}${min ? `&min=${min}` : ""}${max ? `&max=${max}` : ""}${location.state.type ? `&type=${location.state.type == "apartments" ? "apartment" : location.state.type}` : ""}`);

  console.log(data);
  const { dispatch } = useContext(SearchContext);

  const handleClick = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    reFetch();
  };

  const onChangeOptions = (e) => {
    setOptions((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(options);
  };

  console.log(data);


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
    <div>
      <Navbar />
      {/* <Header type="list" /> */}
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>State</label>
              {/* <input placeholder={destination || "London"} type="text" onChange={(e) => setDestination(e.target.value)} /> */}
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
            <div className="lsItem">
              <label>City</label>
              <select name="city" id="city" value={destination} onChange={(e) => setDestination(e.target.value)}>
                <option value="">Select a city</option>
                {cities.map((city, index) => (
                  <option key={index} value={city.toLowerCase()}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            {/* <div className="lsItem">
            {/* <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{dates ? `${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}` : "09/09/2023 to 09/19/2023"}</span>
              {openDate && (
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => {
                    setDates([item.selection]);
                    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
                  }}
                  minDate={new Date()}
                  ranges={
                    dates || [
                      {
                        startDate: new Date(),
                        endDate: new Date(),
                        key: "selection",
                      },
                    ]
                  }
                />
              )}
            </div> */}
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" onChange={(e) => setMin(e.target.value)} className="lsOptionInput" placeholder="Rs0" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" onChange={(e) => setMax(e.target.value)} className="lsOptionInput" placeholder="Rs0" />
                </div>
                {/* <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input type="number" id="adult" onChange={onChangeOptions} min={1} className="lsOptionInput" placeholder={options?.adult || 1} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input type="number" id="children" onChange={onChangeOptions} min={0} className="lsOptionInput" placeholder={options?.children || 0} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input type="number" id="room" onChange={onChangeOptions} min={1} className="lsOptionInput" placeholder={options?.room || 1} />
                </div> */}
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">{loading ? <Spinner /> : <>{data.length === 0 ? <h1>NO DATA FOUND!🤷‍♀️</h1> : data.map((item) => <SearchItem item={item} key={item._id} />)}</>}</div>
        </div>
      </div>
    </div>
  );
};

export default List;
