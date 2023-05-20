import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource.jsx";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useLayoutEffect } from "react";
import useFetch from "../../hooks/useFetch";
import newRequest from "../../utils/newRequest";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const RoomsDatatable = ({ columns }) => {
  const URL = "http://localhost:8800/api";
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const [hostels, setHostels] = useState([]);
  const [hostel, setHostel] = useState({
    id: "",
    name: "",
  });

  console.log(hostel);
  const [list, setList] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const getHostels = async () => {
      const res = await newRequest.get(`${URL}/hostels`, {
        withCredentials: true,
      });
      console.log("setting hostels");
      setHostels(res.data);
      console.log(res.data);
      setDataLoaded(true);
    };
    getHostels();
  }, []);

  useEffect(() => {
    if (hostels && hostels.length > 0 && !hostel.id) {
      setHostel({
        id: `${hostels?.[0]._id}`,
        name: `${hostels?.[0].name}`,
      });
    }
  }, [path, hostels, hostel.id]);

  useEffect(() => {
    if (hostel.id) {
      const getHostel = async () => {
        const res = await newRequest.get(`${URL}/hostels/find/${hostel.id}`);
        setList(res.data.rooms);
        setDataLoaded(true);
      };
      getHostel();
    }
  }, [hostel.id]);

  console.log(list);

  const handleChange = (e) => {
    const { value } = e.target;
    setHostel({
      id: value,
      name: e.target.options[e.target.selectedIndex].text,
    });
  };

  const handleDelete = async (id, hostelId) => {
    try {
      const url = path !== "rooms" ? `${URL}/${path}/${id}` : `${URL}/${path}/${id}/${hostelId}`;

      const res = await newRequest.delete(url, {
        withCredentials: true,
      });
      // await axios.delete(`${URL}/${path}/${id}`);
      console.log(res);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link> */}
            <Link to={`/${path}/update/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="updateButton">Update</div>
            </Link>
            {/* <div className="deleteButton" onClick={() => handleDelete(path !== "rooms" ? params.row._id : `${params.row._id}/${params.row.hostelId}`)}> */}
            <div className="deleteButton" onClick={() => handleDelete(params.row._id, params.row.hostelId)}>
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <ToastContainer />
      <div className="datatable">
        <div>
          <h1 className="heading">Select Rooms with respect to specific Hostel</h1>
          {hostels && (
            <select onChange={handleChange}>
              <option value="">Select Hostel!</option>
              {hostels?.map((hostel, index) => {
                return (
                  <option key={hostel._id} value={hostel._id} defaultValue={index === 1}>
                    {hostel.name}
                  </option>
                );
              })}
            </select>
          )}
        </div>

        <div className="datatableTitle">
          {path}
          <Link to={`/${path}/new`} className="link">
            Add New
          </Link>
        </div>

        {list && <DataGrid className="datagrid" rows={list ? list : []} columns={columns.concat(actionColumn)} pageSize={9} rowsPerPageOptions={[9]} checkboxSelection getRowId={(row) => row?._id} />}
      </div>
    </>
  );
};

export default RoomsDatatable;
