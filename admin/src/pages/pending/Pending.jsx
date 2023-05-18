import React, { useState, useEffect } from "react";
import newRequest from "../../utils/newRequest";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { DataGrid } from "@mui/x-data-grid";
import "./pending.css";

//   const [pendingRooms, setPendingRooms] = useState();

//   console.log(pendingRooms);

//   useEffect(() => {
//     const getPendingRooms = async () => {
//       const res = await newRequest.get("rooms/pendingRooms");
//       setPendingRooms(res.data);
//     };

//     getPendingRooms();
//   }, []);

//   const handleApprove = async (roomId, userId) => {
//     try {
//       const res = await newRequest.post(`rooms/approvePendingRequest/${roomId}`, {
//         userId,
//       });

//       console.log(res);
//       setPendingRooms(pendingRooms.filter((item) => item._id !== roomId));
//     } catch (err) {
//       // console.log(err.response.data);
//       console.log(err);
//     }
//   };

//   const columns = [
//     { field: "name", headerName: "Name", width: 150 },
//     { field: "floor_number", headerName: "Floor Number", width: 150 },
//     { field: "price", headerName: "Price", width: 150 },
//     { field: "maxPeople", headerName: "Max People", width: 150 },
//     {
//       field: "status",
//       headerName: "Status",
//       width: 150,
//       valueGetter: (params) => params.row.status[Object.keys(params.row.status)[0]].status,
//     },
//   ];

//   const userStatusColumns = [];

//   if (pendingRooms && Object.keys(pendingRooms).length > 0) {
//     const userIds = Object.keys(pendingRooms[Object.keys(pendingRooms)[0]][0].status || {});

//     for (const userId of userIds) {
//       userStatusColumns.push({
//         field: `status_${userId}`,
//         headerName: `Status (${userId})`,
//         width: 150,
//         valueGetter: (params) => params.row.status[userId]?.status || "",
//       });
//     }
//   }

//   const actionColumn = [
//     {
//       field: "action",
//       headerName: "Action",
//       width: 250,
//       renderCell: (params) => {
//         const userId = params.row.status[0].userId;

//         return (
//           <div className="cellAction">
//             <div className="approveButton" onClick={() => handleApprove(params.row._id, userId)}>
//               Approve
//             </div>
//           </div>
//         );
//       },
//     },
//   ];

//   const columnsWithStatus = columns.concat(userStatusColumns);

//   // const rows = [];

//   // const createRows = () => {
//   //   for (const [hostelId, rooms] of Object.entries(pendingRooms)) {
//   //     for (const room of rooms) {
//   //       rows.push({ ...room, id: room._id });
//   //     }
//   //   }
//   // };

//   // {
//   //   pendingRooms && createRows();
//   // }

//   const createRows = () => {
//     const rows = [];

//     for (const [hostelId, rooms] of Object.entries(pendingRooms)) {
//       for (const room of rooms) {
//         const row = {
//           ...room,
//           id: room._id,
//           hostelId,
//           status: {},
//         };

//         for (const status of room.status) {
//           row.status[status.userId] = {
//             userId: status.userId,
//             status: status.status,
//           };
//         }

//         rows.push(row);
//       }
//     }

//     return rows;
//   };

//   // createRows();

//   {
//     pendingRooms && createRows();
//   }

//   return (
//     <>
//       <div className="new">
//         <Sidebar />
//         <div className="newContainer">
//           <Navbar />
//           <div className="top">
//             <h1>Pending Rooms</h1>
//           </div>
//           <div className="bottom">
//             <div className="right">
//               {pendingRooms ? (
//                 <div>
//                   {Object.entries(pendingRooms).map(([hostelId, rooms]) => (
//                     <div className="hostel_container" key={hostelId}>
//                       <h2 className="hostel_heading">Hostel ID: {hostelId}</h2>
//                       <div style={{ height: 400, width: "100%" }}>
//                         {/* <DataGrid rows={rooms} columns={columns.concat(actionColumn)} pageSize={9} rowsPerPageOptions={[9]} checkboxSelection getRowId={(row) => row._id} /> */}
//                         {/* <DataGrid rows={rooms} columns={columnsWithStatus.concat(actionColumn)} pageSize={9} rowsPerPageOptions={[9]} checkboxSelection getRowId={(row) => row._id} /> */}
//                         {/* <DataGrid rows={rooms} columns={columnsWithStatus.concat(actionColumn)} pageSize={9} rowsPerPageOptions={[9]} checkboxSelection getRowId={(row) => row._id} /> */}
//                         <DataGrid rows={createRows().map((row) => ({ ...row, hostelId: undefined }))} columns={columns.concat(userStatusColumns)} pageSize={9} rowsPerPageOptions={[9]} checkboxSelection getRowId={(row) => row._id} />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <h1>NO PENDING ROOMS!</h1>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PendingRooms;

// import { useEffect, useState } from "react";
// import { DataGrid } from "@material-ui/data-grid";
// import { Button } from "@material-ui/core";
// import { updateRoomStatus } from "../api";

const PendingRooms = () => {
  const [pendingRooms, setPendingRooms] = useState();
  const [status, setStatus] = useState();

  useEffect(() => {
    const getPendingRooms = async () => {
      const res = await newRequest.get("rooms/pendingRooms");
      setPendingRooms(res.data);
    };

    getPendingRooms();
  }, []);

  console.log(pendingRooms);

  // const handleApprove = async (roomId, userId) => {
  //   try {
  //     const res = await newRequest.post(`rooms/approvePendingRequest/${roomId}`, {
  //       userId,
  //     });

  //     console.log(res);
  //     setPendingRooms(pendingRooms.filter((item) => item._id !== roomId));
  //   } catch (err) {
  //     // console.log(err.response.data);
  //     console.log(err);
  //   }
  // };

  // const handleApprove = async (roomId, userId) => {
  //   // await updateRoomStatus(roomId, userId, "approved");
  //   setPendingRooms((prevRooms) => {
  //     const newRooms = { ...prevRooms };
  //     for (const [hostelId, rooms] of Object.entries(prevRooms)) {
  //       for (const room of rooms) {
  //         if (room._id === roomId) {
  //           room.status = room.status.map((s) => (s.userId === userId ? { ...s, status: "approved" } : s));
  //         }
  //       }
  //     }
  //     return newRooms;
  //   });
  // };

  // const handleReject = async (roomId, userId) => {
  //   // await updateRoomStatus(roomId, userId, "rejected");
  //   setPendingRooms((prevRooms) => {
  //     const newRooms = { ...prevRooms };
  //     for (const [hostelId, rooms] of Object.entries(prevRooms)) {
  //       for (const room of rooms) {
  //         if (room._id === roomId) {
  //           room.status = room.status.map((s) => (s.userId === userId ? { ...s, status: "rejected" } : s));
  //         }
  //       }
  //     }
  //     return newRooms;
  //   });
  // };

  // const handleApprove = async (roomId, userId) => {
  //   setPendingRooms((prevRooms) => {
  //     const newRooms = { ...prevRooms };
  //     for (const [hostelId, rooms] of Object.entries(prevRooms)) {
  //       for (const room of rooms) {
  //         if (room._id === roomId) {
  //           room.status = room.status.map((s) => (s.userId === userId ? { ...s, status: "booked" } : s));
  //         }
  //       }
  //     }
  //     return newRooms;
  //   });
  // };

  const handleStatus = async (roomId, userId, status) => {
    try {
      const res = await newRequest.post(`rooms/approvePendingRequest/${roomId}`, {
        userId,
        status,
      });

      console.log(res);
      // setPendingRooms(pendingRooms.filter((item) => item._id !== roomId));
      try {
        const res = await newRequest.get("rooms/pendingRooms");
        setPendingRooms(res.data);
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
      alert(err.response.data.error);
    }
  };

  // const handleApprove = async (roomId, userId, status) => {
  //   try {
  //     const res = await newRequest.post(`rooms/approvePendingRequest/${roomId}`, {
  //       userId,
  //       status: 'booked'
  //     });

  //     console.log(res);
  //     setPendingRooms(pendingRooms.filter((item) => item._id !== roomId));
  //   } catch (err) {
  //     // console.log(err.response.data);
  //     console.log(err);
  //   }
  // };

  // const handleReject = async (roomId, userId) => {
  //   setPendingRooms((prevRooms) => {
  //     const newRooms = { ...prevRooms };
  //     for (const [hostelId, rooms] of Object.entries(prevRooms)) {
  //       for (const room of rooms) {
  //         if (room._id === roomId) {
  //           room.status = room.status.map((s) => (s.userId === userId ? { ...s, status: "rejected" } : s));
  //         }
  //       }
  //     }
  //     return newRooms;
  //   });
  // };

  // const createRows = (room) => {
  //   const rows = [];
  //   for (const status of room.status) {
  //     rows.push({
  //       id: status._id,
  //       roomId: room._id,
  //       userId: status.userId,
  //       status: status.status,
  //       actions: (
  //         <div>
  //           <div className="approveButton" onClick={() => handleApprove(room._id, status.userId)} disabled={status.status !== "pending"}>
  //             Approve
  //           </div>
  //           <div className="rejectButton" onClick={() => handleReject(room._id, status.userId)} disabled={status.status !== "pending"}>
  //             Reject
  //           </div>
  //         </div>

  //       ),
  //     });
  //   }
  //   return rows;
  // };

  // {
  //   pendingRooms && createRows();
  // }

  // const createRows = (room) => {
  //   const rows = [];
  //   for (const status of room.status) {
  //     rows.push({
  //       id: status._id,
  //       roomId: room._id,
  //       userId: status.userId,
  //       status: status.status,
  //       actions: (
  //         // <div>
  //         //   <button className="approveButton" onClick={() => handleApprove(room._id, status.userId)} disabled={status.status !== "pending"}>
  //         //     Approve
  //         //   </button>
  //         //   <button className="rejectButton" onClick={() => handleReject(room._id, status.userId)} disabled={status.status !== "pending"}>
  //         //     Reject
  //         //   </button>
  //         // </div>
  //         <div>
  //           <button className="approveButton" onClick={() => handleApprove(room._id, status.userId)} disabled={status.status !== "pending"}>
  //             Approve
  //           </button>
  //           <button className="rejectButton" onClick={() => handleReject(room._id, status.userId)} disabled={status.status !== "pending"}>
  //             Reject
  //           </button>
  //         </div>
  //       ),
  //     });
  //   }
  //   return rows;
  // };

  //   const createRows = (room) => {
  //   const rows = [];
  //   for (const status of room.status) {
  //     rows.push({
  //       id: status._id,
  //       roomId: room._id,
  //       userId: status.userId,
  //       status: status.status,
  //       disabled: status.status !== "pending",
  //       actions: (
  //         <div>
  //           {status.status === "pending" && (
  //             <button
  //               className="approveButton"
  //               onClick={() => handleApprove(room._id, status.userId)}
  //               disabled={status.status !== "pending"}
  //             >
  //               Approve
  //             </button>
  //           )}
  //           {status.status === "pending" && (
  //             <button
  //               className="rejectButton"
  //               onClick={() => handleReject(room._id, status.userId)}
  //               disabled={status.status !== "pending"}
  //             >
  //               Reject
  //             </button>
  //           )}
  //         </div>
  //       ),
  //     });
  //   }
  //   return rows;
  // };

  const createRows = (room) => {
    const rows = [];
    for (const status of room.status) {
      // const isApproved = status.status === "approved";
      const isPending = status.status === "pending";
      const isRejected = status.status === "rejected";
      const isBooked = status.status === "booked";
      rows.push({
        id: status._id,
        roomId: room._id,
        userId: status.userId,
        status: status.status,
        disabled: isBooked,
        actions: (
          <div>
            {/* <button className="approveButton" onClick={() => handleStatus(room._id, status.userId, "approved")} disabled={isPending || isBooked}> */}
            <button className="approveButton" onClick={() => handleStatus(room._id, status.userId, "booked")}>
              Approve
            </button>
            {/* <button className="rejectButton" onClick={() => handleReject(room._id, status.userId, "rejected")} disabled={isRejected || isBooked}> */}
            <button className="rejectButton" onClick={() => handleStatus(room._id, status.userId, "rejected")}>
              Reject
            </button>
          </div>
        ),
      });
    }
    return rows;
  };

  const columns = [
    { field: "userId", headerName: "User ID", width: 100 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      sortable: false,
      renderCell: (params) => params.row.actions,
    },
  ];

  if (!pendingRooms) {
    return <h1>Loading...</h1>;
  }

  if (Object.keys(pendingRooms).length === 0) {
    return <h1>No pending rooms!</h1>;
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Pending Rooms</h1>
        </div>
        <div className="bottom">
          <div className="right">
            {pendingRooms ?
              Object.entries(pendingRooms).map(([hostelId, rooms]) => (
                <div className="hostel_container" key={hostelId}>
                  <h2 className="hostel_heading">Hostel ID: {hostelId}</h2>
                  {rooms.map((room) => (
                    <div className="room_container" key={room._id}>
                      <h3 className="room_heading">{room.type}</h3>
                      <div>
                        <DataGrid rows={createRows(room)} columns={columns} autoHeight autoWidth pageSize={5} rowsPerPageOptions={[5]} getRowId={(row) => row.id} />
                      </div>
                    </div>
                  ))}
                </div>
              )) : <h1>ujj</h1>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingRooms;
