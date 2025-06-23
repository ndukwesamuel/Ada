import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const ForgotPassword = () => {
  const [loading, setLoading] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data) => {
      setLoading(true);
      // Perform API call here to send OTP to the provided email address
      const response = await axios.post("/forgot-password", data);
      return response.data;
    },
    onSuccess: (data) => {
      setLoading(false);
      toast.success(data.message);
      navigate("/reset-password", { state: { email: data.email } });
    },
    onError: (error) => {
      setLoading(false);
      toast.error(error.response?.data?.error || "Failed to send OTP");
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

            <button
              disabled={loading}
              className="btn btn-block w-100 bg-success  text-light mt-4 p-3 fw-bold"
              type="submit"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
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


export default ForgotPassword;
