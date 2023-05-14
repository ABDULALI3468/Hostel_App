import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import React from "react";
import "./app.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserSIGNUP from "./components/UserSIGNUP";
import Login from "./components/Login";
import CreateHotel from "./components/CreateHotel";
import Navbar from "./components/Navbar";
import UpdateHOSTEL from "./components/UpdateHotel";
import GetOwnerHostel from "./components/GetOwnerHostel";

function App() {
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          {/* <Footer /> */}
        </QueryClientProvider>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <UserSIGNUP />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/createHOTEL",
          element: <CreateHotel />,
        },
        {
          path: "/updateHOSTEL/:id",
          element: <UpdateHOSTEL />,
        },
        {
          path: "/getHostel",
          element: <GetOwnerHostel />,
        },
        // {
        //   path: "/gigs",
        //   element: <Gigs />,
        // },
        // {
        //   path: "/myGigs",
        //   element: <MyGigs />,
        // },
        // {
        //   path: "/orders",
        //   element: <Orders />,
        // },
        // {
        //   path: "/messages",
        //   element: <Messages />,
        // },
        // {
        //   path: "/message/:id",
        //   element: <Message />,
        // },
        // {
        //   path: "/add",
        //   element: <Add />,
        // },
        // {
        //   path: "/gig/:id",
        //   element: <Gig />,
        // },
        // {
        //   path: "/register",
        //   element: <Register />,
        // },
        // {
        //   path: "/login",
        //   element: <Login />,
        // },
        // {
        //   path: "/pay/:id",
        //   element: <Pay />,
        // },
        // {
        //   path: "/success",
        //   element: <Success />,
        // },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
