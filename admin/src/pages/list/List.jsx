import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import RoomsDatatable from "../../components/RoomsDatatable/RoomsDatatable";
import { Link, useLocation } from "react-router-dom";

const List = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {path === "rooms" ? <RoomsDatatable columns={columns} /> : <Datatable columns={columns} />}
      </div>
    </div>
  );
};

export default List;
