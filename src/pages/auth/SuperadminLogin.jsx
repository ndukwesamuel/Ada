import { useState } from "react";
import axios from "axios"; // Import Axios
import { useAuth } from "../../../contexts/Auth";
import { FaRegEyeSlash } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import logo from "../../assets/pause_logo_light1.jpeg";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logindispatch } from "@/redux/AuthSlice";
const apiUrl = "https://uneven-tarrah-pausepoint-950a7a7b.koyeb.app/login";
// const apiUrl = "http://localhost:5050/login";
// const apiUrl = "http://172.20.10.2:5050/login";

export default function SuperadminLogin() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Manual loading state

  const [first, setfirst] = useState("");

  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.post(apiUrl, {
        email: email.toLowerCase(),
        password,
      });

      if (data?.error) {
        toast.error(data);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth({ ...auth, token: data.token, user: data.user });
        dispatch(logindispatch(data));
        toast.success("Login successful");

        console.log({
          nbnb: data?.user?.roles,
        });
        let role = data?.user?.roles;

        if (role.includes("superadmin")) {
          navigate("/dashboard/admin");
        }
      }
    } catch (err) {
      console.error("Login error:", err);

      let badadata = JSON.stringify(err);

      setfirst(badadata);
      toast.error(badadata || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="container">
        <Link
          to="/"
          className="w-[150px] h-[150px] block rounded-lg mx-auto -mb-8"
        >
          <img className="w-full h-full" src={logo} alt="" />
        </Link>
      </div>
      <div className="container my-2">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <>
              <p className="text-center text-success text-3xl mt-4 pb-3">
                Login as {selectedRole}
              </p>
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  className="form-control mb-4 p-3"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control mb-4 p-3"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span
                    className="password-toggle-text show1"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
                  </span>
                </div>

                <div className="">
                  <span>
                    Forgot password? Click{" "}
                    <Link
                      className="text-success fw-bold underline"
                      to="/forgot-password"
                    >
                      here
                    </Link>
                  </span>
                </div>

                <button
                  className="btn btn-block w-100 bg-success text-light mt-4 p-3 fw-bold"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Submit"}
                </button>

                <p>{first}</p>
              </form>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}
