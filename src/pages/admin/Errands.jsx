import React, { useState, useEffect } from "react";
// Assuming useAuth is correctly implemented for user authentication context
// import { useAuth } from "../../../contexts/Auth"; // Uncomment if you need auth data here
import { useMutateData, useFetchData } from "@/hook/Request"; // Ensure this path is correct
// If you're using toast notifications, uncomment this:
// import { toast } from "react-hot-toast";

// Ensure your hooks/Request.js is configured for web (as in previous response)

const Errands = () => {
  // const { auth } = useAuth(); // Uncomment if you need auth data here

  // State for controlling the Create Runner modal visibility
  const [isCreateRunnerModalOpen, setIsCreateRunnerModalOpen] = useState(false);

  // State for the active tab: 'runners' or 'errands'
  const [activeTab, setActiveTab] = useState("runners");

  // State for creating a new runner
  const [newRunnerData, setNewRunnerData] = useState({
    clanId: "",
    name: "",
    email: "",
  });

  // const { data: isgetAllEstate, refetch: refetchEstates } = useFetchData(
  //   `/v1/admin/get-all-estate`,
  //   "get-all-estate"
  // );
  // Fetch all existing runners
  const {
    data: allRunnersData,
    isLoading: isLoadingRunners,
    isError: isErrorRunners,
    error: runnersError,
    refetch: refetchRunners, // Keep refetch if you want to manually trigger a refresh
  } = useFetchData(`/v1/admin/runner`, "runners"); // Your backend route: GET /api/runners

  // Fetch all existing errands
  const {
    data: allErrandsData,
    isLoading: isLoadingErrands,
    isError: isErrorErrands,
    error: errandsError,
    refetch: refetchErrands, // Keep refetch if you want to manually trigger a refresh
  } = useFetchData(`/v1/admin/errands`, "allErrands"); // Your backend route: GET /api/errands

  // Mutation hook for creating a runner
  const { mutate: createRunner, isLoading: isCreatingRunner } = useMutateData(
    "runners", // This is the endpoint segment for your POST request, e.g., /api/runners
    "POST"
  );

  // Handle input changes for the new runner form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRunnerData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submission for creating a new runner
  const handleCreateRunner = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!newRunnerData.clanId || !newRunnerData.name || !newRunnerData.email) {
      alert("Please fill in all fields to create a runner."); // Or toast.error
      return;
    }

    createRunner(
      {
        url: `/v1/admin/runner`,
        data: newRunnerData,
      },
      {
        onSuccess: () => {
          alert("Runner created successfully!");
        },
        onError: (err) => {
          console.log("Error creating household:", err);
          alert("An error occurred while creating the Estate.");
        },
      }
    );

    // createRunner(newRunnerData, {
    //   onSuccess: (data) => {
    //     alert(`Runner "${data.user.name}" created successfully!`); // Or toast.success
    //     setNewRunnerData({ clanId: "", name: "", email: "" }); // Clear form
    //     setIsCreateRunnerModalOpen(false); // Close the modal on success
    //     // refetchRunners() is implicitly handled by useMutateData's query invalidation
    //   },
    //   onError: (error) => {
    //     const errorMessage =
    //       error.response?.data?.message || "Failed to create runner.";
    //     alert(errorMessage); // Or toast.error
    //     console.error("Create Runner Error:", error.response?.data || error);
    //   },
    // });
  };

  // Error alerts for data fetching (optional, can be replaced by toasts)
  useEffect(() => {
    if (isErrorRunners && runnersError) {
      // toast.error(`Error fetching runners: ${runnersError.message}`);
      console.error("Error fetching runners:", runnersError);
    }
    if (isErrorErrands && errandsError) {
      // toast.error(`Error fetching errands: ${errandsError.message}`);
      console.error("Error fetching errands:", errandsError);
    }
  }, [isErrorRunners, runnersError, isErrorErrands, errandsError]);

  // --- Reusable Card Components for Display ---
  const renderRunnerCard = (runner) => (
    <div
      key={runner._id}
      className="bg-blue-50 p-4 rounded-lg shadow-sm mb-3 border border-blue-200"
    >
      <h3 className="text-lg font-semibold text-blue-800 mb-1">
        {runner.user?.name || "N/A"}
      </h3>
      <p className="text-gray-700 text-sm">
        Email: {runner.user?.email || "N/A"}
      </p>
      <p className="text-gray-700 text-sm">
        Clan: {runner.clan?.name || "N/A"} ({runner.clan?.uniqueClanID || "N/A"}
        )
      </p>
      <p className="text-gray-700 text-sm">
        Total Errands: {runner.errands?.length || 0}
      </p>
    </div>
  );

  const renderErrandCard = (errand) => (
    <div
      key={errand._id}
      className="bg-gray-50 p-4 rounded-lg shadow-sm mb-3 border border-gray-200"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-1">
        {errand.title}
      </h3>
      <p className="text-gray-700 text-sm">
        Status:{" "}
        <span
          className={`font-medium ${
            errand.status === "completed"
              ? "text-green-600"
              : errand.status === "pending"
              ? "text-yellow-600"
              : errand.status === "cancelled"
              ? "text-red-600"
              : "text-blue-600"
          }`}
        >
          {errand.status}
        </span>
      </p>
      <p className="text-gray-700 text-sm">
        Delivery: {errand.deliveryAddress}
      </p>
      <p className="text-gray-700 text-sm">
        Total Amount: ₦
        {errand.totalAmount ? errand.totalAmount.toFixed(2) : "0.00"}
      </p>
      <p className="text-gray-700 text-sm">
        Created by: {errand.user?.name || "N/A"}
      </p>
      <p className="text-gray-700 text-sm">
        For Clan: {errand.clan?.name || "N/A"}
      </p>
    </div>
  );

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        Admin Panel
      </h1>
      {/* --- Create Runner Button --- */}
      <div className="mb-8 text-center">
        <button
          onClick={() => setIsCreateRunnerModalOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          Create New Runner
        </button>
      </div>
      {/* --- Create Runner Modal --- */}
      {isCreateRunnerModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-700">
                Create New Runner
              </h2>
              <button
                onClick={() => setIsCreateRunnerModalOpen(false)}
                className="text-gray-500 hover:text-gray-800 text-3xl font-bold"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleCreateRunner}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Runner Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="James Efik"
                  value={newRunnerData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Runner Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="runner@example.com"
                  value={newRunnerData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  autoCapitalize="none"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="clanId"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Clan ID:
                </label>
                <input
                  type="text"
                  id="clanId"
                  name="clanId"
                  placeholder="e.g., 66998837f7240ad1b17fa4d0"
                  value={newRunnerData.clanId}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white p-3 rounded-md font-semibold hover:bg-green-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                disabled={isCreatingRunner}
              >
                {isCreatingRunner ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Create Runner"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
      ---
      {/* --- Tabs Section --- */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("runners")}
            className={`px-4 py-2 text-lg font-medium ${
              activeTab === "runners"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            All Runners
          </button>
          <button
            onClick={() => setActiveTab("errands")}
            className={`ml-4 px-4 py-2 text-lg font-medium ${
              activeTab === "errands"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            All Errands
          </button>
        </div>

        {/* --- Tab Content --- */}
        {activeTab === "runners" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-6">
              Runners List
            </h2>
            {isLoadingRunners ? (
              <div className="flex justify-center items-center py-10">
                <svg
                  className="animate-spin h-8 w-8 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <p className="ml-3 text-lg text-gray-600">Loading runners...</p>
              </div>
            ) : isErrorRunners ? (
              <p className="text-red-600 text-center text-lg">
                Failed to load runners: {runnersError?.message}
              </p>
            ) : allRunnersData?.data?.length === 0 ? (
              <p className="text-gray-600 text-center text-lg">
                No runners found.
              </p>
            ) : (
              <div>{allRunnersData?.data?.map(renderRunnerCard)}</div>
            )}
          </div>
        )}

        {activeTab === "errands" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-6">
              Errands List
            </h2>
            {isLoadingErrands ? (
              <div className="flex justify-center items-center py-10">
                <svg
                  className="animate-spin h-8 w-8 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <p className="ml-3 text-lg text-gray-600">Loading errands...</p>
              </div>
            ) : isErrorErrands ? (
              <p className="text-red-600 text-center text-lg">
                Failed to load errands: {errandsError?.message}
              </p>
            ) : allErrandsData?.errands?.length === 0 ? (
              <p className="text-gray-600 text-center text-lg">
                No errands found.
              </p>
            ) : (
              <div>{allErrandsData?.errands?.map(renderErrandCard)}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Errands;
