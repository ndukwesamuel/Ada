import { useFetchData } from "@/hook/Request";
import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid Date";
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

// Modal Component for Visitor Details (unchanged)
// const VisitorDetailModal = ({ visitor, onClose }) => {
//   /* ... existing modal code ... */
// };

const VisitorDetailModal = ({ visitor, onClose }) => {
  if (!visitor) return null;

  const statusColorClass =
    visitor.status === "departed"
      ? "text-blue-600"
      : visitor.status === "arrived"
      ? "text-green-600"
      : "text-yellow-600"; // pending

  const validityColorClass = visitor.isValid
    ? "text-green-600"
    : "text-red-600";

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50 font-inter">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-auto relative transform transition-all duration-300 scale-100 opacity-100">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
        <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">
          Visitor Details
        </h3>
        <div className="space-y-3 text-gray-700">
          <p>
            <strong className="font-semibold">Name:</strong>{" "}
            {visitor.visitor_name}
          </p>
          <p>
            <strong className="font-semibold">Access Code:</strong>{" "}
            {visitor.access_code}
          </p>
          <p>
            <strong className="font-semibold">Invited by:</strong>{" "}
            {visitor.creator
              ? `${visitor.creator.name} (${visitor.creator.email})`
              : "N/A"}
          </p>
          <p>
            <strong className="font-semibold">Phone:</strong>{" "}
            {visitor.phone_number || "N/A"}
          </p>
          <p>
            <strong className="font-semibold">Location:</strong>{" "}
            {visitor.location || "N/A"}
          </p>
          <p>
            <strong className="font-semibold">Expires:</strong>{" "}
            {formatDate(visitor.expires)}
          </p>
          <p>
            <strong className="font-semibold">Status:</strong>{" "}
            <span className={`font-semibold ${statusColorClass}`}>
              {visitor.status.toUpperCase()}
            </span>
          </p>
          <p>
            <strong className="font-semibold">Validity:</strong>{" "}
            <span className={`font-semibold ${validityColorClass}`}>
              {visitor.isValid ? "Valid" : "Invalid"}
            </span>
          </p>
          {visitor.arrived_at && (
            <p>
              <strong className="font-semibold">Arrived:</strong>{" "}
              {formatDate(visitor.arrived_at)}
            </p>
          )}
          {visitor.departed_at && (
            <p>
              <strong className="font-semibold">Departed:</strong>{" "}
              {formatDate(visitor.departed_at)}
            </p>
          )}
        </div>
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 ease-in-out shadow-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
// Main Visitor History Component with Search
const VisitorHistory = () => {
  const { selectedEstate } = useSelector(
    (state) => state?.reducer?.estateSlice || {}
  );

  const {
    data: VistorHistory,
    isLoading: isLoadingVistorHistory,
    isError: isErrorVistorHistory,
    error: visitorHistoryError,
  } = useFetchData(
    `/v1/clan/${selectedEstate?._id}/webAdminGuest/all_Guest`,
    "getVistorHistory"
  );

  const visitors = VistorHistory?.visitorHistory || [];

  const [showModal, setShowModal] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter visitors based on search term (Access Code and Invited By)
  const filteredVisitors = useMemo(() => {
    if (!searchTerm) return visitors;

    const lowerCaseSearch = searchTerm.toLowerCase();
    return visitors.filter((visitor) => {
      const accessCodeMatch = visitor.access_code
        ?.toLowerCase()
        .includes(lowerCaseSearch);
      const invitedByMatch =
        visitor.creator?.name?.toLowerCase().includes(lowerCaseSearch) ||
        visitor.creator?.email?.toLowerCase().includes(lowerCaseSearch);
      return accessCodeMatch || invitedByMatch;
    });
  }, [visitors, searchTerm]);

  const handleViewDetails = (visitor) => {
    setSelectedVisitor(visitor);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVisitor(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 font-inter">
      <div className="max-w-7xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            All Visitor Invitations
          </h2>

          {/* Search Input */}
          <div className="w-full sm:w-96">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search by Access Code or Invited By"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg
                    className="h-5 w-5 text-gray-400 hover:text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {isLoadingVistorHistory && (
          <p className="text-center text-gray-600 text-lg">
            Loading visitor history...
          </p>
        )}

        {isErrorVistorHistory && (
          <p className="text-center text-red-600 text-lg">
            Error loading visitor history:{" "}
            {visitorHistoryError?.message || "Unknown error"}
          </p>
        )}

        {!isLoadingVistorHistory &&
          !isErrorVistorHistory &&
          filteredVisitors.length === 0 && (
            <div className="text-center py-8">
              {searchTerm ? (
                <>
                  <p className="text-xl text-gray-700">
                    No visitors match your search criteria.
                  </p>
                  <button
                    onClick={() => setSearchTerm("")}
                    className="mt-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    Clear search
                  </button>
                </>
              ) : (
                <p className="text-xl text-gray-700 italic">
                  No visitor invitations found for this clan.
                </p>
              )}
            </div>
          )}

        {!isLoadingVistorHistory &&
          !isErrorVistorHistory &&
          filteredVisitors.length > 0 && (
            <>
              <div className="mb-4 text-sm text-gray-500">
                Showing {filteredVisitors.length} of {visitors.length} visitors
                {searchTerm && (
                  <>
                    {" "}
                    matching{" "}
                    <span className="font-semibold">"{searchTerm}"</span>
                    <button
                      onClick={() => setSearchTerm("")}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      (Clear)
                    </button>
                  </>
                )}
              </div>

              <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Visitor Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Access Code
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Invited By
                      </th>
                      {/* <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Validity
                      </th> */}
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredVisitors.map((visitor) => {
                      const statusColorClass =
                        visitor.status === "departed"
                          ? "text-blue-600"
                          : visitor.status === "arrived"
                          ? "text-green-600"
                          : "text-yellow-600";

                      const validityColorClass = visitor.isValid
                        ? "text-green-600"
                        : "text-red-600";

                      return (
                        <tr key={visitor._id} className="hover:bg-gray-50">
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {visitor.visitor_name}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                            {visitor.access_code}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                            {visitor.creator?.name || "N/A"}
                          </td>
                          {/* <td className="px-4 py-4 whitespace-nowrap text-sm">
                            <span
                              className={`font-semibold ${statusColorClass}`}
                            >
                              {visitor.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm">
                            <span
                              className={`font-semibold ${validityColorClass}`}
                            >
                              {visitor.isValid ? "Valid" : "Invalid"}
                            </span>
                          </td> */}
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleViewDetails(visitor)}
                              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200 ease-in-out shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
      </div>

      {/* Visitor Detail Modal */}
      {showModal && (
        <VisitorDetailModal
          visitor={selectedVisitor}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default VisitorHistory;
