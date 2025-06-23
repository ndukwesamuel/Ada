import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CreateEstate = () => {
  const [ loading, setLoading] = useState()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data) => {
      setLoading(true);
      const response = await axios.post("/clan/Admingetuserclans", data);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        setLoading(true);
        toast.success("Estate created successfully");
        reset();
        queryClient.invalidateQueries(["clans"]);
        navigate("/dashboard/estates");
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to create estate");
    },
  });

  return (
    <div>
      <h1 className="bg-green-600 bg-success text-light mb-4 p-3 text-center">
        Create Estate
      </h1>
      <form onSubmit={handleSubmit(mutation.mutate)}>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Name:
          </label>
          <input
            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="Estate name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>
        <div className="my-4">
          <label className="block text-gray-700 text-sm font-semibold mb-1">Address:</label>
          <input
            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="Address"
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">Phone:</label>
          <input
            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="Phone"
            {...register("phone", { required: "Phone is required" })}
          />
          {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
        </div>
        <div className="my-4">
          <label className="block text-gray-700 text-sm font-semibold mb-1">Email:</label>
          <input
            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>
        <button className="btn btn-success " disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateEstate;
