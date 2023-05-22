import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import List from "./pages/list/List.jsx";
import Hotel from "./pages/hotel/Hotel";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { productInputs, userInputs } from "./formSource.js";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";


function App() {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    const accessToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];

    console.log(accessToken);

    if (!user || !accessToken) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="/" element={<Home />} />
          <Route path="/hostels" element={<List />} />
          <Route
            path="/hostels/:id"
            element={
              <ProtectedRoute>
                <Hotel />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup inputs={userInputs} title="Add New User" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
