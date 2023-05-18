import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource.jsx";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useLayoutEffect } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Datatable = ({ columns }) => {
  const URL = "http://localhost:8800/api";
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  // console.log(columns.columnName);

  const [hostels, setHostels] = useState([]);
  const [hostel, setHostel] = useState({
    id: "",
    name: "",
  });
  const [list, setList] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  console.log("================");
  console.log(hostels);
  console.log("hostels");
  console.log("================");

  console.log("================");
  console.log(hostel);
  console.log("hostel");
  console.log("================");

  let { data, loading, error } = useFetch(`${URL}/${path}`);

  useEffect(() => {
    if (path === "rooms") {
      const getHostels = async () => {
        const res = await axios.get(`${URL}/hostels`);
        console.log("setting hostels");
        setHostels(res.data);
        console.log(res.data);
        setDataLoaded(true);
      };
      getHostels();
    }
  }, []);

  useEffect(() => {
    if (path === "rooms" && hostels.length > 0 && !hostel.id) {
      setHostel({
        id: `${hostels?.[0]._id}`,
        name: `${hostels?.[0].name}`,
      });
    }
  }, [path, hostels, hostel.id]);

  useEffect(() => {
    if (path === "rooms" && hostel.id) {
      const getHostel = async () => {
        const res = await axios.get(`${URL}/hostels/find/${hostel.id}`);
        setList(res.data.rooms);
        setDataLoaded(true);
      };
      getHostel();
    }
  }, [path, hostel.id]);

  useEffect(() => {
    console.log("HOSTEL CHANGED");
  }, [hostel.id]);

  useEffect(() => {
    if (path !== "rooms") {
      setList(data);
    }
  }, [data]);

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

      const res = await axios.delete(url, {
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
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
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
      <div className="datatable">
        {path === "rooms" && (
          <div>
            <h1 className="heading">Select Rooms with respect to specific Hostel</h1>
            <select onChange={handleChange}>
              <option value="">Select Hostel!</option>
              {hostels?.length > 0 &&
                hostels?.map((hostel, index) => {
                  return (
                    <option key={hostel._id} value={hostel._id}>
                      {hostel.name}
                    </option>
                  );
                })}
            </select>
          </div>
        )}

        <div className="datatableTitle">
          {path}
          <Link to={`/${path}/new`} className="link">
            Add New
          </Link>
        </div>
        {/* <DataGrid className="datagrid" rows={list ? list : []} columns={columns.concat(actionColumn)} pageSize={9} rowsPerPageOptions={[9]} checkboxSelection getRowId={(row) => row?._id} /> */}

        {loading ? <p>Loading...</p> : list && <DataGrid className="datagrid" rows={list ? list : []} columns={columns.concat(actionColumn)} pageSize={9} rowsPerPageOptions={[9]} checkboxSelection getRowId={(row) => row?._id} />}
      </div>
    </>
  );
};

export default Datatable;
