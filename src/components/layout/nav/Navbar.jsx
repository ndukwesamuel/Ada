import { useState } from "react";
import Logo from "../../../assets/pause_logo_light1.jpeg";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import "../../../styles/navbar.css";
import { useAuth } from "../../../../contexts/Auth";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const closeNavbar = () => {
    setNavbar(false);
  };

  const handleClick = () => {
    setNavbar(!navbar);
  };

  const logout = () => {
    setAuth({ ...auth, auth: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/");
  };

  // console.log(auth?.token);
  const myRole = auth?.user?.roles;
  // console.log(myRole);
  return (
    <div className="nav-container flex justify-center sticky-top shadow-lg">
      <div className="max-w-[85%] w-[100%] flex justify-between items-center">
        <Link to="/">
          <img src={Logo} alt="logo" style={{ width: "6.5rem" }} />
        </Link>
        <div>
          <div onClick={handleClick} className="lg:hidden text-2xl">
            {navbar ? <IoCloseSharp /> : <GiHamburgerMenu />}
          </div>
          <ul
            className={`lg:flex items-center md:space-x-8 ${
              navbar
                ? "absolute z-50 right-0 top-20 max-w-[300px] w-full bg-white p-10 flex flex-col items-baseline gap-10 mt-1"
                : "hidden"
            }`}
          >
            <NavLink
              className="hover:text-lime-600 text-lg"
              to="/"
              onClick={closeNavbar}
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              className="hover:text-lime-600 text-lg"
              to="/about"
              onClick={closeNavbar}
            >
              <li>About</li>
            </NavLink>
            <NavLink
              className="hover:text-lime-600 text-lg"
              to="/services"
              onClick={closeNavbar}
            >
              <li>Services</li>
            </NavLink>
            {/* <NavLink to="/list" onClick={closeNavbar}>
              <li>Events</li>
            </NavLink> */}
            <NavLink
              className="hover:text-lime-600 text-lg"
              to="/contact"
              onClick={closeNavbar}
            >
              <li>Contact</li>
            </NavLink>
            <NavLink to="https://onelink.to/v3tx8w" target="_blank">
              <button className="downloadBtn  hover:border-lime-600 hover:bg-green-200 hover:text-teal-950">
                Download App
              </button>
            </NavLink>
            {/* {auth?.token ? (
              <>
                <div className="dropdown">
                  <button
                    className="btn btn-successs dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <b>{auth?.user?.name.toUpperCase()}</b>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/dashboard/${
                          myRole?.includes("admin") ? "admin" : "user"
                        }`}
                      >
                        Dashboard
                      </Link>
                      <Link className="dropdown-item" to="/settings">
                        Settings
                      </Link>
                    </li>
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={logout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <> */}
            <NavLink
              className="btn btn-outline hover:border-lime-600  hover:bg-green-200 hover:text-teal-950 py-2 px-3 rounded"
              to="/login"
            >
              Get Started
            </NavLink>
            {/* </>
            )} */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
