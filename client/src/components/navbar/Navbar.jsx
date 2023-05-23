// const Navbar = () => {
//   return (
//     <header id="header" className="d-flex align-items-center">
//       <div className="container d-flex align-items-center">
//         <div id="logo" className="me-auto">
//           <a href="/">
//             <img src="https://bizzy.org/_next/image?url=https%3A%2F%2Fbizzy.ams3.digitaloceanspaces.com%2Fprod%2Fcompanies%2Fbe%2Flogos%2Feb0dfadf-e8cd-427a-9a37-68bed6e72ca6%2F1155365443.png&w=256&q=75" alt />
//           </a>
//         </div>
//         <nav id="navbar" className="navbar order-last order-lg-0">
//           <ul>
//             <li>
//               <a className="nav-link scrollto active" href="#hero">
//                 Home
//               </a>
//             </li>
//             <li>
//               <a className="nav-link scrollto" href="#about">
//                 About
//               </a>
//             </li>
//             <li>
//               <a className="nav-link scrollto" href="#features">
//                 Features
//               </a>
//             </li>
//             <li>
//               <a className="nav-link scrollto " href="#portfolio">
//                 Portfolio
//               </a>
//             </li>
//             <li>
//               <a className="nav-link scrollto" href="#team">
//                 Team
//               </a>
//             </li>

//             <li>
//               {/* <a className="nav-link scrollto" href="#contact"> */}
//               <a className="nav-link scrollto" href="/signup">
//                 Contact
//               </a>
//             </li>
//             <li>
//               <a className="nav-link scrollto" href="/signup">
//                 Register
//               </a>
//             </li>
//             <li>
//               <a className="nav-link scrollto" href="/login">
//                 Login
//               </a>
//             </li>
//           </ul>
//           <i className="bi bi-list mobile-nav-toggle" />
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || null;
    setUser(user);
  }, []);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("user", null);
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header id="header" className="d-flex align-items-center">
      <div className="container d-flex align-items-center">
        <div id="logo" className="me-auto">
          <a href="/">
            <img src="https://bizzy.org/_next/image?url=https%3A%2F%2Fbizzy.ams3.digitaloceanspaces.com%2Fprod%2Fcompanies%2Fbe%2Flogos%2Feb0dfadf-e8cd-427a-9a37-68bed6e72ca6%2F1155365443.png&w=256&q=75" alt />
          </a>
        </div>
        <nav id="navbar" className="navbar order-last order-lg-0">
          <ul>
            <li>
              <a className="nav-link scrollto active" href="/">
                Home
              </a>
            </li>
            <li>
              <a className="nav-link scrollto" href="#about">
                About
              </a>
            </li>
            <li>
              <a className="nav-link scrollto" href="#features">
                Features
              </a>
            </li>
            <li>
              <a className="nav-link scrollto " href="#portfolio">
                Portfolio
              </a>
            </li>
            <li>
              <a className="nav-link scrollto" href="#team">
                Team
              </a>
            </li>

            <li>
              <a className="nav-link scrollto" href="#">
                Contact
              </a>
            </li>
            {!user && (
              <>
                <li>
                  <a className="nav-link scrollto" href="/login">
                    Login
                  </a>
                </li>
              </>
            )}
            {user && (
              <>
                <li>
                  <a className="nav-link scrollto">{user.username}</a>
                </li>
                <li onClick={handleLogout}>
                  <a className="nav-link scrollto">Logout</a>
                </li>
              </>
            )}
          </ul>
          <i className="bi bi-list mobile-nav-toggle" />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
