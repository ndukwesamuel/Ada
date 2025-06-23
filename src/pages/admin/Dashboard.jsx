import { useState } from "react";
import { useAuth } from "../../../contexts/Auth";
// import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import ClanDashboard from "./ClanDashboard";
import { useFetchData, useMutateData } from "@/hook/Request";
// import { data } from "node_modules/autoprefixer/lib/autoprefixer";

const AdminDashboard = () => {
  const { auth } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEstate, setNewEstate] = useState({
    name: "",
    address: "",
    phonenumber: "",
    creatorEmail: "",
  });

  const { data: isgetAllEstate, refetch: refetchEstates } = useFetchData(
    `/v1/admin/get-all-estate`,
    "get-all-estate"
  );

  const { mutate: createEstate, isPending: ispendingcreateEstate } =
    useMutateData("get-all-estate", "POST");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEstate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createEstate(
      {
        url: `/v1/admin/create-estate`,
        data: newEstate,
      },
      {
        onSuccess: () => {
          alert("Estate created successfully!");
          setNewEstate({
            name: "",
            address: "",
            phonenumber: "",
            creatorEmail: "",
          });
        },
        onError: (err) => {
          console.log("Error creating household:", err);
          alert("An error occurred while creating the Estate.");
        },
      }
    );
    // createEstateMutation.mutate(newEstate);
  };

  return (
    <>
      <h1 className="bg-green-500 text-white my-4 p-3 rounded">
        Welcome back
        <b className="ml-3 text-yellow-300">{auth?.user?.name.toUpperCase()}</b>
      </h1>

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Create New Estate
      </button>

      <ClanDashboard clans={isgetAllEstate} />

      {/* Modal Backdrop */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {/* Modal Container */}
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create New Estate</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={newEstate.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Address:</label>
                <input
                  type="text"
                  name="address"
                  value={newEstate.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Phone Number:
                </label>
                <input
                  type="tel"
                  name="phonenumber"
                  value={newEstate.phonenumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">
                  Creator Email:
                </label>
                <input
                  type="email"
                  name="creatorEmail"
                  value={newEstate.creatorEmail}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:opacity-50"
                  disabled={ispendingcreateEstate}
                >
                  {ispendingcreateEstate ? "Creating..." : "Create Estate"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
