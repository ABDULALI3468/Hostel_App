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
          <input required name="destination" type="text" placeholder="Where are you going?" className="headerSearchInput" onChange={(e) => setDestination(e.target.value)} />
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
