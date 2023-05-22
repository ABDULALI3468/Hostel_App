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

  return (
    <div>
      <Navbar />
      {/* <Header type="list" /> */}
      <div className="listContainer">
        <div className="listWrapper">
        
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination || "London"} type="text" onChange={(e) => setDestination(e.target.value)} />
            </div>
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
                  <input type="number" onChange={(e) => setMin(e.target.value)} className="lsOptionInput" placeholder="0$" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" onChange={(e) => setMax(e.target.value)} className="lsOptionInput" placeholder="0$" />
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
