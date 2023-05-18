import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
// import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";
import UpdateHotel from "./pages/updateHotel/UpdateHotel";
import UpdateRoom from "./pages/updateRoom/UpdateRoom";
import UpdateUser from "./pages/updateUser/UpdateUser";
import PendingRooms from "./pages/pending/Pending";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className={darkMode ? "app dark" : "app"}>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route
                path="pending"
                element={
                  <ProtectedRoute>
                    <PendingRooms />
                  </ProtectedRoute>
                }
              />

              <Route
                path="messages"
                element={
                  <ProtectedRoute>
                    <Messages />
                  </ProtectedRoute>
                }
              />

              <Route
                path="message/:id"
                element={
                  <ProtectedRoute>
                    <Message />
                  </ProtectedRoute>
                }
              />

              <Route path="login" element={<Login />} />
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="users">
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <List columns={userColumns} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path=":userId"
                  element={
                    <ProtectedRoute>
                      <Single />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="new"
                  element={
                    <ProtectedRoute>
                      <New inputs={userInputs} title="Add New User" />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="update/:id"
                  element={
                    <ProtectedRoute>
                      <UpdateUser inputs={userInputs} title="Update User Info" />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="hostels">
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <List columns={hotelColumns} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path=":productId"
                  element={
                    <ProtectedRoute>
                      <Single />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="new"
                  element={
                    <ProtectedRoute>
                      <NewHotel />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="update/:id"
                  element={
                    <ProtectedRoute>
                      <UpdateHotel />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="rooms">
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <List columns={roomColumns} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path=":productId"
                  element={
                    <ProtectedRoute>
                      <Single />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="new"
                  element={
                    <ProtectedRoute>
                      <NewRoom />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="update/:id"
                  element={
                    <ProtectedRoute>
                      <UpdateRoom />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
