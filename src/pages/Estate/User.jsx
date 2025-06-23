// }

import React, { useState, useEffect } from "react";
import { useFetchData, useMutateData } from "@/hook/Request";
import { FaEdit, FaTrash, FaSearch, FaFilter } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MembersTable = () => {
  const navigate = useNavigate();
  // State management
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const { selectedEstate } = useSelector(
    (state) => state?.reducer?.estateSlice
  );

  // Fetch members data
  const { data, isLoading, isError } = useFetchData(
    `/v1/clan/${selectedEstate?._id}`,
    "clanMembers"
  );

  console.log({
    njnj: data,
  });

  const { mutate: updateProspect, isPending: isPendingUpdateProspect } =
    useMutateData("clanMembers", "PATCH");

  const { mutate: creatememercode, isPending: isPendingcreatememercode } =
    useMutateData("clanMembers", "POST");

  // Initialize and filter members
  useEffect(() => {
    if (data) {
      setMembers(data.members);
      setFilteredMembers(data.members);
      setLoading(false);
    }
  }, [data]);

  // Apply search and filter whenever dependencies change
  useEffect(() => {
    let result = members;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (member) =>
          member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (member.phonenumber && member.phonenumber.includes(searchTerm)) ||
          (member.homeAddress &&
            member.homeAddress.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((member) => member.status === statusFilter);
    }

    setFilteredMembers(result);
  }, [searchTerm, statusFilter, members]);

  const [flatNumber, setFlatNumber] = useState("");
  const [street, setStreet] = useState("");
  const [apartmentType, setApartmentType] = useState("");

  // Handle edit member
  // const handleEdit = (memberId) => {
  //   const member = members.find((m) => m._id === memberId);
  //   setSelectedMember(member);
  //   setPhone(member?.phonenumber || "");
  //   setAddress(member?.homeAddress || "");
  //   setIsModalOpen(true);
  // };

  const handleEdit = (memberId) => {
    const member = members.find((m) => m._id === memberId);
    setSelectedMember(member);
    setPhone(member?.phonenumber || "");
    setAddress(member?.homeAddress || "");

    if (selectedEstate?.email === "happylandestate1@gmail.com") {
      setFlatNumber(member?.flatNumber || "");
      setStreet(member?.street || "");
      setApartmentType(member?.apartmentType || "");
    }
    setIsModalOpen(true);
  };

  // Handle save edited member
  // const handleSave = () => {

  //   updateProspect({
  //     url: `/v1/clan/${selectedEstate?._id}`,
  //     data: {
  //       homeAddress: address,
  //       phonenumber: phone,
  //       memberId: selectedMember?._id,
  //     },
  //   });
  //   setIsModalOpen(false);
  // };

  const handleSave = () => {
    // Base data that always gets sent
    const requestData = {
      phonenumber: phone,
      homeAddress: address, // Original address field remains unchanged
      memberId: selectedMember?._id,
    };

    // Only add the additional fields if it's happylandestate
    if (selectedEstate?.email === "happylandestate1@gmail.com") {
      requestData.flatNumber = flatNumber;
      requestData.street = street;
      requestData.apartmentType = apartmentType;
    }

    // Make the API call
    updateProspect({
      url: `/v1/clan/${selectedEstate?._id}`,
      data: requestData,
    });

    // Close the modal
    setIsModalOpen(false);
  }; // Handle status change
  const handleStatusChange = (memberId, newStatus) => {
    updateProspect({
      url: `/v1/clan/${selectedEstate?._id}/status`,
      data: {
        memberId,
        status: newStatus,
      },
    });
  };

  // Status options for dropdown
  const statusOptions = [
    {
      value: "pending",
      label: "Pending",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      value: "approved",
      label: "Approved",
      color: "bg-green-100 text-green-800",
    },
    { value: "rejected", label: "Rejected", color: "bg-red-100 text-red-800" },
    {
      value: "suspended",
      label: "Suspended",
      color: "bg-purple-100 text-purple-800",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-700">Loading members...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">
          Failed to fetch members. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Members List </h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/estate-admin/user-profile")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add New Member
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search members..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              <FaFilter />
              <span>Filter</span>
            </button>

            {showFilters && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <div className="p-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-md p-2"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Members Table */}

      {/* Members Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              {selectedEstate?.email === "happylandestate1@gmail.com" ? (
                <>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Flat Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Street
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Apartment Type
                  </th>
                </>
              ) : (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Member Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Admin Level
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <tr key={member._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {member.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member?.phonenumber || "N/A"}
                  </td>

                  {selectedEstate?.email === "happylandestate1@gmail.com" ? (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {member?.flatNumber || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {member?.street || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {member?.apartmentType || "N/A"}
                      </td>
                    </>
                  ) : (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member?.homeAddress || "N/A"}
                    </td>
                  )}

                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={member.status}
                      onChange={(e) =>
                        handleStatusChange(member._id, e.target.value)
                      }
                      className={`text-xs font-semibold rounded-full px-2 py-1 ${
                        statusOptions.find((opt) => opt.value === member.status)
                          ?.color || "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {statusOptions.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                          className={option.color}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.memberCode || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.isAdmin ? `Level ${member.adminLevel}` : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 gap-10">
                    <div>
                      {member?.memberCode ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              navigate(
                                `/estate-admin/user-profile/${member._id}`
                              )
                            }
                            className="text-green-500 hover:text-red-700"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleEdit(member._id)}
                            className="text-blue-500 hover:text-blue-700"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() =>
                            navigate(`/estate-admin/user-profile/${member._id}`)
                          }
                          className="text-green-500 hover:text-red-700"
                        >
                          View
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={
                    selectedEstate?.email === "happylandestate1@gmail.com"
                      ? 10
                      : 8
                  }
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No members found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Member Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Admin Level
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <tr key={member._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {member.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member?.phonenumber || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member?.homeAddress || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={member.status}
                      onChange={(e) =>
                        handleStatusChange(member._id, e.target.value)
                      }
                      className={`text-xs font-semibold rounded-full px-2 py-1 ${
                        statusOptions.find((opt) => opt.value === member.status)
                          ?.color || "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {statusOptions.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                          className={option.color}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.memberCode || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.isAdmin ? `Level ${member.adminLevel}` : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 gap-10">
                    <div>
                      {member?.memberCode ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              navigate(
                                `/estate-admin/user-profile/${member._id}`
                              )
                            }
                            className="text-green-500 hover:text-red-700"
                            // title="Delete"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleEdit(member._id)}
                            className="text-blue-500 hover:text-blue-700"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                    
                        </div>
                      ) : (
                   
                        <button
                          onClick={() =>
                            navigate(`/estate-admin/user-profile/${member._id}`)
                          }
                          className="text-green-500 hover:text-red-700"
                  
                        >
                          View
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                  No members found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div> */}

      {/* Edit Member Modal */}
      {/* {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            {isPendingUpdateProspect && (
              <div className="mb-4 text-blue-500">Saving changes...</div>
            )}
            <h2 className="text-xl font-bold mb-4">Edit Member Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )} */}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            {isPendingUpdateProspect && (
              <div className="mb-4 text-blue-500">Saving changes...</div>
            )}
            <h2 className="text-xl font-bold mb-4">Edit Member Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {selectedEstate?.email === "happylandestate1@gmail.com" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Flat Number
                    </label>
                    <input
                      type="text"
                      value={flatNumber}
                      onChange={(e) => setFlatNumber(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Street Name
                    </label>
                    <select
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Street</option>
                      <option value="Peace close">Peace close</option>
                      <option value="Felicia momoh">Felicia momoh</option>
                      <option value="Achief close">Achief close</option>
                      <option value="Halleluyah close">Halleluyah close</option>
                      <option value="Favoured honour close">
                        Favoured honour close
                      </option>
                      <option value="Saluwala Kadiku Street">
                        Saluwala Kadiku Street
                      </option>
                      <option value="Hibiscus link road">
                        Hibiscus link road
                      </option>
                      <option value="Cedar street">Cedar street</option>
                      <option value="Alhaji Ekemode">Alhaji Ekemode</option>
                      <option value="Maple Street">Maple Street</option>
                      <option value="Samuel Ukpong">Samuel Ukpong</option>
                      <option value="Soji Sanyaolu close">
                        Soji Sanyaolu close
                      </option>
                      <option value="Doyin Ishola Close">
                        Doyin Ishola Close
                      </option>
                      <option value="John Agabri Street">
                        John Agabri Street
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Type of Apartment
                    </label>
                    <select
                      value={apartmentType}
                      onChange={(e) => setApartmentType(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Apartment Type</option>
                      <option value="Bungalow">Bungalow</option>
                      <option value="Duplex">Duplex</option>
                      <option value="Flat">Flat</option>
                      <option value="Room and Parlour">Room and Parlour</option>
                      <option value="Selfcon">Selfcon</option>
                      <option value="School">School</option>
                      <option value="Hotels">Hotels</option>
                      <option value="Shops">Shops</option>
                    </select>
                  </div>
                </>
              )}
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function User() {
  return <MembersTable />;
}
