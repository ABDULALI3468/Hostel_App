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

const Datatable = ({ columns }) => {
  const URL = "http://localhost:8800/api";
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const [hostels, setHostels] = useState([]);
  const [hostel, setHostel] = useState({
    id: "",
    name: "",
  });
  const [list, setList] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  let { data, loading, error } = useFetch(`${URL}/${path}`);
  console.log(data);

  useEffect(() => {
    setList(data);
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

        <div className="datatableTitle">
          {path}
          <Link to={`/${path}/new`} className="link">
            Add New
          </Link>
        </div>
        {loading ? <p>Loading...</p> : list && <DataGrid className="datagrid" rows={list ? list : []} columns={columns.concat(actionColumn)} pageSize={9} rowsPerPageOptions={[9]} checkboxSelection getRowId={(row) => row?._id} />}
      </div>
    </>
  );
};

export default Datatable;
