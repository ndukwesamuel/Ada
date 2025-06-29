import { useState } from "react";
// import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../../contexts/Auth";
import { FaRegEyeSlash } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import logo from "../../assets/pause_logo_light1.jpeg";
// import { useMutateData } from "../../hooks/useMutateData"; // Import the custom hook
import toast from "react-hot-toast"; // For displaying error messages
import { useNavigate, Link } from "react-router-dom";
import { useMutateData } from "@/hook/Request";
import { useDispatch } from "react-redux";
import { logindispatch } from "@/redux/AuthSlice";

export default function Login() {
  const dispatch = useDispatch();
  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  // Hooks
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  // Login mutation
  const loginMutation = useMutateData("login", "POST");

  // Handle role selection
  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({
      email,
      password,
    });

    try {
      // Call the login mutation
      const data = await loginMutation.mutateAsync({
        url: "/api/v1/auth/signin",
        data: {
          email: email.toLowerCase(),
          password,
        },
      });

      // Handle successful login
      if (data?.error) {
        toast.error(data.error); // Display error message from the server
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth({ ...auth, token: data.token, user: data.user });

        dispatch(logindispatch(data));

        toast.success("Login successful");

        console.log({
          fffcc: data,
        });

        navigate("/dashboard/home");
      }
    } catch (err) {
      // Handle errors from the mutation
      console.error("Login error:", err);
      toast.error(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <div>
      <div className="container"></div>
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
                  disabled={loginMutation.isLoading} // Disable button while loading
                >
                  {loginMutation.isLoading ? "Loading..." : "Submit"}
                </button>

                {/* Display error message if mutation fails */}
                {loginMutation.error && (
                  <div className="text-danger mt-3">
                    {loginMutation.error.message ||
                      "Login failed. Please try again."}
                  </div>
                )}
              </form>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}
