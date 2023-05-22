import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import List from "./pages/list/List.jsx";
import Hotel from "./pages/hotel/Hotel";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { productInputs, userInputs } from "./formSource.js";
// import "../public/assets/css/style.css";
// import "./pages/signup/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hostels" element={<List />} />
        <Route path="/hostels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup inputs={userInputs} title="Add New User" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
