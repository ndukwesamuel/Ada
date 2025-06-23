import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // Assuming Redux setup is available
import { useFetchData, useMutateData } from "@/hook/Request"; // Assuming this hook exists and functions as described

// Custom Modal Component (for submission confirmation and delete confirmation)
const CustomModal = ({ show, onClose, message, onConfirm, type = "info" }) => {
  if (!show) return null;

  const isConfirmation = type === "confirm";

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-auto transform transition-all duration-300 scale-100 opacity-100">
        <h3
          className={`text-lg font-bold mb-4 ${
            isConfirmation ? "text-red-700" : "text-gray-800"
          }`}
        >
          {isConfirmation ? "Confirm Deletion" : "Success!"}
        </h3>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          {isConfirmation && (
            <button
              onClick={onClose} // Cancel action for confirmation modal
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              Cancel
            </button>
          )}
          <button
            onClick={isConfirmation ? onConfirm : onClose} // Confirm for confirm, close for info
            className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out
              ${
                isConfirmation
                  ? "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
                  : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
              }
            `}
          >
            {isConfirmation ? "Delete" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Annoucement component
const Annoucement = () => {
  // State for managing current view mode: 'list' or 'form'
  const [mode, setMode] = useState("list"); // 'list' or 'form'
  // State for managing the current step of the form (used only in 'form' mode)
  const [currentStep, setCurrentStep] = useState(1);

  // Redux selector for selected estate (assuming it provides relevant info like postedBy or default estateId)
  const { selectedEstate } = useSelector(
    (state) => state?.reducer?.estateSlice || {} // Provide a fallback empty object
  );

  // Fetch announcements using the custom hook
  // The 'data' from useFetchData will be the actual announcements
  const {
    data: fetchedAnnouncements, // Rename 'data' to 'fetchedAnnouncements' to avoid name collision
    isLoading,
    isError,
    // Assuming useFetchData might provide a refetch function to manually trigger a data refresh
    // refetch // Uncomment if useFetchData provides a refetch method
  } = useFetchData(`/v1/admin-forum`, "announcements");

  // const { mutate: updateProspect, isPending: isPendingUpdateProspect } =
  //   useMutateData("clanMembers", "PATCH");

  const { mutate: createAnnouncements, isPending: isPendingAnnouncements } =
    useMutateData("announcements", "POST");

  const {
    mutate: updateAnnouncements,
    isPending: isPendingUpdateAnnouncements,
  } = useMutateData("announcements", "PATCH");

  const {
    mutate: deleteAnnouncements,
    isPending: isPendingDelteAnnouncements,
  } = useMutateData("announcements", "Delete");

  // State to store all announcements, will be updated from fetched data
  const [allAnnouncements, setAllAnnouncements] = useState([]);

  // useEffect to update allAnnouncements when fetchedAnnouncements changes
  // This ensures the UI reflects the data from the API
  useEffect(() => {
    if (fetchedAnnouncements) {
      setAllAnnouncements(fetchedAnnouncements);
    }
  }, [fetchedAnnouncements]);

  // State to store form data for creation or editing
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    link: "",
    global: false,
    postedBy: "",
    estateIds: [],
  });
  // State to track if an announcement is being edited (stores its _id)
  const [editingAnnouncementId, setEditingAnnouncementId] = useState(null);

  // States for confirmation modals
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState({
    show: false,
    idToDelete: null,
  });

  // Common headers for API requests
  // In a real app, you might get auth token from Redux or a separate hook
  const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    // Authorization: `Bearer YOUR_AUTH_TOKEN`, // Replace with actual token
  });

  // Function to handle changes in form input fields
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Function to handle changes for the estateIds input (as a comma-separated string)
  const handleEstateIdsChange = (e) => {
    const value = e.target.value;
    const idsArray = value
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id !== "");
    setFormData((prevData) => ({
      ...prevData,
      estateIds: idsArray,
    }));
  };

  // --- Form Navigation Functions ---
  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  // Function to reset form data and return to list mode
  const returnToListAndResetForm = () => {
    setFormData({
      title: "",
      content: "",
      link: "",
      global: false,
      postedBy: selectedEstate?.adminId || "", // Pre-fill postedBy from Redux if available
      estateIds: selectedEstate?.estateId ? [selectedEstate.estateId] : [], // Pre-fill estateId if a specific estate is selected
    });
    setEditingAnnouncementId(null);
    setCurrentStep(1);
    setMode("list");
    // if (refetch) refetch(); // Uncomment if you have a refetch function
  };

  // Function to start a new announcement creation
  const startCreatingNew = () => {
    returnToListAndResetForm(); // Ensures clean form state with defaults
    setMode("form"); // Switch to form mode
  };

  // Function to start editing an existing announcement
  const startEditing = (announcement) => {
    setFormData({
      title: announcement.title,
      content: announcement.content,
      link: announcement.link || "", // Ensure link is not null/undefined
      global: announcement.global,
      postedBy: announcement.postedBy,
      estateIds: announcement.estateIds || [], // Ensure estateIds is an array
    });
    setEditingAnnouncementId(announcement._id);
    setCurrentStep(1); // Go to the first step of the form
    setMode("form"); // Switch to form mode
  };

  // Function to handle form submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editingAnnouncementId) {
        // Logic to update existing announcement via API (PUT request)
        response = await fetch(`/v1/admin-forum/${editingAnnouncementId}`, {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify(formData),
        });
      } else {
        createAnnouncements({
          url: `/v1/admin-forum`,
          data: formData,
        });
      }

      //   if (!response.ok) {
      //     const errorData = await response.json();
      //     throw new Error(errorData.message || "Failed to save announcement.");
      //   }

      //   const result = await response.json();
      //   console.log("API Response:", result);

      // Optimistically update the local state to reflect the change
      // In a real scenario, you might refetch the data to be fully consistent
      if (editingAnnouncementId) {
        setAllAnnouncements((prev) =>
          prev.map((ann) =>
            ann._id === editingAnnouncementId
              ? { ...ann, ...formData, updatedAt: new Date().toISOString() }
              : ann
          )
        );
        setSubmissionMessage("Announcement updated successfully!");
      } else {
        setAllAnnouncements((prev) => [
          ...prev,
          {
            ...formData,
            _id: result._id || Date.now().toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ]);
        setSubmissionMessage("New announcement created successfully!");
      }

      setShowSubmissionModal(true); // Show success modal
      returnToListAndResetForm(); // Go back to list and reset form after submission
    } catch (error) {
      console.error("Error submitting announcement:", error);
      setSubmissionMessage(`Error: ${error.message}`);
      setShowSubmissionModal(true); // Show error modal
    }
  };

  // --- Delete Functions ---
  const handleDelete = (id) => {
    setDeleteConfirmationModal({ show: true, idToDelete: id });
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `/v1/admin-forum/${deleteConfirmationModal.idToDelete}`,
        {
          method: "DELETE",
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete announcement.");
      }

      // Filter out the deleted announcement from the local state
      setAllAnnouncements((prev) =>
        prev.filter((ann) => ann._id !== deleteConfirmationModal.idToDelete)
      );
      console.log(
        `Announcement with ID ${deleteConfirmationModal.idToDelete} deleted from API.`
      );
      setDeleteConfirmationModal({ show: false, idToDelete: null });
      setSubmissionMessage("Announcement deleted successfully!");
      setShowSubmissionModal(true); // Show deletion success modal
    } catch (error) {
      console.error("Error deleting announcement:", error);
      setDeleteConfirmationModal({ show: false, idToDelete: null }); // Close modal on error
      setSubmissionMessage(`Error: ${error.message}`);
      setShowSubmissionModal(true); // Show error modal
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmationModal({ show: false, idToDelete: null });
  };

  // --- Render Functions for different views ---

  // Renders the multi-step form for creating/editing
  const renderForm = () => {
    const isEditing = editingAnnouncementId !== null;
    const formTitle = isEditing
      ? "Edit Announcement"
      : "Create New Announcement";

    return (
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 hover:scale-[1.01]">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          {formTitle}
        </h1>
        {/* Progress Indicator */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-semibold transition-all duration-300 ease-in-out
                  ${currentStep >= step ? "bg-blue-600" : "bg-gray-300"}
                  ${currentStep === step ? "ring-4 ring-blue-300" : ""}`}
              >
                {step}
              </div>
              <p
                className={`mt-2 text-sm font-medium ${
                  currentStep >= step ? "text-blue-700" : "text-gray-500"
                }`}
              >
                {step === 1 ? "Details" : step === 2 ? "Targeting" : "Review"}
              </p>
            </div>
          ))}
        </div>

        {/* Form container */}
        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            // Step 1: Announcement Details
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Announcement Details
              </h2>
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Important: All Systems Go!"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows="4"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-y"
                  placeholder="We've successfully rolled out the latest platform update..."
                  required
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="link"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Link (Optional)
                </label>
                <input
                  type="url"
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="https://yourplatform.com/release-notes"
                />
              </div>
              <div className="flex justify-between mt-6">
                {" "}
                {/* Changed to justify-between */}
                <button
                  type="button"
                  onClick={returnToListAndResetForm} // Button to go back to list
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                >
                  <svg
                    className="-ml-1 mr-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    ></path>
                  </svg>
                  Back to List
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                >
                  Next
                  <svg
                    className="ml-2 -mr-1 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            // Step 2: Targeting Information
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Targeting Information
              </h2>
              <div className="flex items-center">
                <input
                  id="global"
                  name="global"
                  type="checkbox"
                  checked={formData.global}
                  onChange={handleChange}
                  className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="global"
                  className="ml-2 block text-base font-medium text-gray-700"
                >
                  Global Announcement (applies to all estates)
                </label>
              </div>
              {!formData.global && (
                <div>
                  <label
                    htmlFor="estateIds"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Estate IDs (comma-separated)
                  </label>
                  <input
                    type="text"
                    id="estateIds"
                    name="estateIds"
                    value={formData.estateIds.join(", ")} // Display array as comma-separated string
                    onChange={handleEstateIdsChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="67fcf558ca65db9bfc3a704f, anotherId"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Enter MongoDB Object IDs for specific estates, separated by
                    commas.
                  </p>
                </div>
              )}

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                >
                  <svg
                    className="-ml-1 mr-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Previous
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                >
                  Next
                  <svg
                    className="ml-2 -mr-1 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            // Step 3: Confirmation
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Review Announcement
              </h2>
              <div className="bg-gray-50 p-6 rounded-md shadow-inner">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Summary:
                </h3>
                <div className="grid grid-cols-1 gap-4 text-gray-700">
                  <p>
                    <span className="font-medium">Title:</span> {formData.title}
                  </p>
                  <p>
                    <span className="font-medium">Content:</span>{" "}
                    {formData.content}
                  </p>
                  {formData.link && (
                    <p>
                      <span className="font-medium">Link:</span>{" "}
                      <a
                        href={formData.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {formData.link}
                      </a>
                    </p>
                  )}
                  <p>
                    <span className="font-medium">Global:</span>{" "}
                    {formData.global ? "Yes" : "No"}
                  </p>
                  {!formData.global && formData.estateIds.length > 0 && (
                    <p>
                      <span className="font-medium">Target Estates:</span>{" "}
                      {formData.estateIds.join(", ")}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                >
                  <svg
                    className="-ml-1 mr-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Previous
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
                >
                  {isEditing ? "Update Announcement" : "Submit Announcement"}
                  <svg
                    className="ml-2 -mr-1 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    );
  };

  // Renders the list of announcements
  const renderAnnouncementsList = () => {
    if (isLoading) {
      return (
        <div className="text-center text-gray-600 text-xl py-20 bg-white p-8 rounded-xl shadow-2xl w-full max-w-4xl">
          <svg
            className="animate-spin h-8 w-8 text-blue-500 mx-auto mb-4"
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
          Loading announcements...
        </div>
      );
    }

    if (isError) {
      return (
        <div className="text-center text-red-600 text-xl py-20 bg-white p-8 rounded-xl shadow-2xl w-full max-w-4xl">
          <svg
            className="h-8 w-8 text-red-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          Error fetching announcements. Please try again.
        </div>
      );
    }

    return (
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-4xl transform transition-all duration-300 hover:scale-[1.005] overflow-hidden">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          All Announcements
        </h1>
        <div className="mb-6 flex justify-end">
          <button
            onClick={startCreatingNew}
            className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            <svg
              className="h-5 w-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            Create New Announcement
          </button>
        </div>
        {allAnnouncements.length === 0 ? (
          <p className="text-center text-gray-500 text-lg py-10">
            No announcements yet. Click "Create New Announcement" to add one!
          </p>
        ) : (
          <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
            {" "}
            {/* Added max-h and overflow for scrollable list */}
            {allAnnouncements.map((announcement) => (
              <div
                key={announcement._id}
                className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-200 ease-in-out"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800 leading-snug pr-4">
                    {announcement.title}
                  </h3>
                  {announcement.global ? (
                    <span className="flex-shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                      Global
                    </span>
                  ) : (
                    <span className="flex-shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                      Targeted
                    </span>
                  )}
                </div>
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {" "}
                  {/* Added line-clamp for content */}
                  {announcement.content}
                </p>
                {announcement.link && (
                  <p className="text-sm text-blue-600 hover:underline mb-2 truncate">
                    <a
                      href={announcement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {announcement.link}
                    </a>
                  </p>
                )}
                {!announcement.global &&
                  announcement.estateIds &&
                  announcement.estateIds.length > 0 && (
                    <p className="text-xs text-gray-500 mb-2">
                      <span className="font-semibold">Estates:</span>{" "}
                      {announcement.estateIds.join(", ")}
                    </p>
                  )}
                <div className="text-xs text-gray-500 flex justify-between items-center pt-3 border-t border-gray-100 mt-4">
                  <span>Posted By: {announcement.postedBy}</span>
                  <span>
                    {new Date(announcement.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-end space-x-3 mt-4">
                  <button
                    onClick={() => startEditing(announcement)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <svg
                      className="h-4 w-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      ></path>
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(announcement._id)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <svg
                      className="h-4 w-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 font-sans">
      {mode === "list" ? renderAnnouncementsList() : renderForm()}

      {/* Submission Confirmation Modal */}
      <CustomModal
        show={showSubmissionModal}
        onClose={() => setShowSubmissionModal(false)}
        message={submissionMessage}
        type="info"
      />

      {/* Delete Confirmation Modal */}
      <CustomModal
        show={deleteConfirmationModal.show}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this announcement? This action cannot be undone."
        type="confirm"
      />
    </div>
  );
};

export default Annoucement;
