import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";

const ResetPassword = () => {
  const [loading, setLoading] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data) => {
      setLoading(true);
      // Perform API call here to reset the password with the provided OTP and new password
      const response = await axios.post("/reset-forgotten-password", data);
      return response.data;
    },
    onSuccess: () => {
      setLoading(false);
      toast.success("Password reset successfully");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to reset password");
    },
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <p className="text-center  text-success text-3xl mt-4 pb-3">
            Forgot Password?
          </p>
          <form onSubmit={handleSubmit(mutation.mutate)}>
            <input
              className="w-full px-3 py-2 border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-green-600"
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
            <input
              className="w-full px-3 py-2 mt-3 border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-green-600"
              type="text"
              placeholder="Enter OTP"
              {...register("otp", { required: "OTP is required" })}
            />
            {errors.otp && (
              <p className="text-sm text-red-500">{errors.otp.message}</p>
            )}
            <div className="password-input-wrapper">
              <input
                className="w-full px-3 py-2 mt-3 border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-green-600"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
              <span
                className="password-input-wrapper show3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
              </span>
            </div>

            <button
              disabled={loading}
              className="btn btn-block w-100 bg-success text-light mt-4 p-3 fw-bold"
              type="submit"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
          <div className=" mt-4">
            <p>
              Back to
              <Link to="/login" className="text-success fw-bold mx-2 underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword ;

