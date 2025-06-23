import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/Auth";
import { FaRegEyeSlash } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import logo from "../../assets/pause_logo_light1.jpeg";

export default function Register() {
  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  // hooks
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const { data } = await axios.post(`/register`, {
        name,
        email,
        password,
      });

      if (data?.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth({ ...auth, token: data.token, user: data.user });
        toast.success("Registration successful");
        navigate("/dashboard/user");
      }
    } catch (err) {
      const errMsg = err?.response?.data;
      toast.error(errMsg.error);
    }
  };

  return (
    <div>
      {/* <h1 className="text-center bg-success text-light mt-4 py-3">Register</h1> */}
      <Link to="/" className="w-[150PX] h-[150px] block rounded-lg mx-auto -mb-8 ">
        <img className="w-full h-full" src={logo} alt="" />
      </Link>
      
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
          <p className="text-center  text-success text-3xl mt-4 pb-3">Register</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control mb-4 p-3"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />

              <input
                type="email"
                className="form-control mb-4 p-3"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control mb-4 p-3"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="password-toggle-text show1"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
                </span>
              </div>
              <div className="password-input-wrapper">
                <input
                  type={showPassword2 ? "text" : "password"}
                  className="form-control mb-4 p-3"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                  className="password-toggle-text show2"
                  onClick={() => setShowPassword2(!showPassword2)}
                >
                  {showPassword2 ? <IoEyeOutline /> : <FaRegEyeSlash />}
                </span>
              </div>

              <button
                className="btn btn-block w-100 bg-success text-light mt-4 p-3 fw-bolds"
                type="submit"
              >
                Submit
              </button>
              <div className="mt-4">
                <p>
                  Already have an account?
                  <a href="/login" className="text-success fw-bold mx-2">
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
