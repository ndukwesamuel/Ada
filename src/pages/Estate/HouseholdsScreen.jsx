import { useFetchData, useMutateData } from "@/hook/Request";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HouseholdsScreen = () => {
  const { selectedEstate } = useSelector(
    (state) => state?.reducer?.estateSlice
  );

  // Fetch members data
  const { data, isLoading, isError } = useFetchData(
    `/v1/clan/all-household/${selectedEstate?._id}`,
    "household"
  );

  const { mutate: createhoushold, isPending: ispendingcreatehoushold } =
    useMutateData("household", "POST");

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateHousehold = async (e) => {
    e.preventDefault();
    createhoushold(
      {
        url: `/v1/clan/create_household`,
        data: {
          clanId: selectedEstate?._id,
          name: formData.name,
          type: formData.type,
          description: formData.description,
          address: formData.address,
        },
      },
      {
        onSuccess: () => {
          alert("Household created successfully!");
          setFormData({ name: "", type: "", description: "", address: "" });
          setShowModal(false);
        },
        onError: (err) => {
          console.log("Error creating household:", err);
          alert("An error occurred while creating the household.");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading households...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
        <div className="text-center">
          <p className="text-red-500">
            Error loading households. Please try again.
          </p>
        </div>
      </div>
    );
  }

  // Ensure households exists or default to empty array
  const households = data?.households || [];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Households</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          + Add Household
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {households.length > 0 ? (
          households.map((household) => (
            <Link
              to={`/estate-admin/household/${household._id}`}
              key={household._id}
              className="bg-white p-5 rounded-2xl shadow-md"
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-700">
                  {household.name || "No name"}
                </h2>
                <p className="text-sm text-gray-500">
                  {household.type || "No type"}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {household.address || "No address"}
                </p>
              </div>

              <div className="mb-2">
                <p className="font-medium text-gray-600">Members:</p>
                {household.members?.length > 0 ? (
                  <ul className="mt-1 space-y-1">
                    {household.members.map((member) => (
                      <li
                        key={member._id}
                        className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg border"
                      >
                        <div>
                          <p className="text-sm font-semibold text-gray-700">
                            {member?.user?.name || "No name"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {member?.user?.email || "No email"}
                          </p>
                        </div>
                        <span className="text-xs text-white bg-blue-500 px-2 py-1 rounded-md">
                          {member?.role || "No role"}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400 italic">No members yet</p>
                )}
              </div>

              <div className="mt-4 text-sm text-gray-500">
                Created:{" "}
                {household?.createdAt
                  ? new Date(household.createdAt).toLocaleDateString()
                  : "Unknown"}
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-2 text-center py-10">
            <p className="text-gray-500">No households found</p>
          </div>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Create Household
            </h2>

            <form onSubmit={handleCreateHousehold} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded-md"
              />

              <input
                type="text"
                name="type"
                placeholder="Type (e.g. Duplex)"
                value={formData.type}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md"
              />

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md"
              ></textarea>

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md"
              />

              <button
                type="submit"
                disabled={ispendingcreatehoushold}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
              >
                {ispendingcreatehoushold ? "Creating..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HouseholdsScreen;
