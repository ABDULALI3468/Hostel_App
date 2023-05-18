export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 120,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },

  // {
  //   field: "country",
  //   headerName: "Country",
  //   width: 100,
  // },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "contact",
    headerName: "Phone",
    width: 100,
  },
];

// export const hotelColumns = [
//   { field: "_id", headerName: "ID", width: 250 },
//   {
//     field: "name",
//     headerName: "Name",
//     width: 150,
//   },
//   {
//     field: "type",
//     headerName: "Type",
//     width: 100,
//   },
//   {
//     field: "title",
//     headerName: "Title",
//     width: 230,
//   },
//   {
//     field: "city",
//     headerName: "City",
//     width: 100,
//   },
// ];

export const hotelColumns = [
  // { field: "_id", headerName: "ID", width: 250 },
  { field: "_id", headerName: "ID", width: 100 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "cat",
    headerName: "Category",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "cheapestPrice",
    headerName: "Cheapest Price",
    width: 100,
  },
];

export const roomColumns = [
  // {
  //   columnName: "room_column",
  // },
  { field: "_id", headerName: "ID", width: 70 },

  {
    field: "desc",
    headerName: "Description",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
  {
    field: "mess",
    headerName: "Mess",
    width: 120,
  },
];
